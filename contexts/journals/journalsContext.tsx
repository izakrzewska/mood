import React, { createContext, FC } from 'react';
import { auth, db } from '../../firebase';
import {
  JournalsAction,
  JournalsDispatch,
  JournalsProviderProps,
  JournalsState,
  JournalStateContextType,
} from './types';
import { JournalFormData } from '../../types';

const initialJournalState = {
  jorunals: undefined,
  openId: undefined,
  isLoading: false,
  error: undefined,
};

const JournalsStateContext = createContext<JournalStateContextType | undefined>(
  undefined
);

const journalsReducer = (state: JournalsState, action: JournalsAction) => {
  switch (action.type) {
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'STOP_LOADING': {
      return {
        ...state,
        isLoading: false,
      };
    }
    case 'SET_JOURNALS': {
      return {
        ...state,
        isLoading: false,
        journals: action.payload,
      };
    }
    case 'SET_OPEN_ID': {
      return {
        ...state,
        openId: action.pyaload,
      };
    }
    case 'SET_ERROR': {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const JournalsProvider: FC<JournalsProviderProps> = ({ children }) => {
  const [state, dispatch] = React.useReducer(
    journalsReducer,
    initialJournalState
  );
  // NOTE: you *might* need to memoize this value
  // Learn more in http://kcd.im/optimize-context
  const value = { state, dispatch };
  return (
    <JournalsStateContext.Provider value={value}>
      {children}
    </JournalsStateContext.Provider>
  );
};

const fetchJournals = async (journalsDispatch: JournalsDispatch) => {
  const user = auth.currentUser!;
  journalsDispatch({ type: 'START_LOADING' });
  try {
    const ref = db
      .collection('journals')
      .where('belongsTo', '==', user.uid)
      .orderBy('createdAt', 'desc');

    ref.onSnapshot((query) => {
      const journalsDataArray: any = [];
      query.forEach((doc) => {
        journalsDataArray.push({
          id: doc.id,
          date: doc.data().createdAt,
          content: doc.data().content,
          isOpen: false,
        });
      });
      journalsDispatch({
        type: 'SET_JOURNALS',
        payload: journalsDataArray,
      });
    });
  } catch (error) {
    journalsDispatch({ type: 'SET_ERROR', payload: error });
  }
};

const addJournal = async (
  data: JournalFormData,
  journalsDispatch: JournalsDispatch
) => {
  const user = auth.currentUser!;
  journalsDispatch({ type: 'START_LOADING' });
  try {
    const journalData = {
      content: data.content,
      belongsTo: user.uid,
      createdAt: new Date(),
    };
    const ref = db.collection('journals');
    await ref.add(journalData);
    // journalsDispatch({ type: 'STOP_LOADING' });
  } catch (error) {
    journalsDispatch({ type: 'SET_ERROR', payload: error });
  }
};

const editJournal = async (
  data: JournalFormData,
  id: string,
  journalsDispatch: JournalsDispatch
) => {
  try {
    const ref = db.collection('journals').doc(id);
    ref.set(
      {
        content: data.content,
      },
      { merge: true }
    );
  } catch (error) {
    console.log('error');
  }
};

const deleteJournal = async (
  id: string,
  journalsDispatch: JournalsDispatch
) => {
  try {
    const ref = db.collection('journals').doc(id);
    ref.delete();
  } catch (error) {
    console.log('error');
  }
};

const useJournals = () => {
  const context = React.useContext(JournalsStateContext);
  if (context === undefined) {
    throw new Error('useJournals must be used within a JournalsProvider');
  }
  return context;
};

export {
  JournalsProvider,
  useJournals,
  fetchJournals,
  addJournal,
  editJournal,
  deleteJournal,
};
