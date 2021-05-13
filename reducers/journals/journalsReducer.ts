import { JournalsStateType, JournalsActionType } from './types';
import { db, auth } from '../../firebase';
import { Journal, JournalFormData } from './types';
import { useReducer, Dispatch } from 'react';

export const initialJournalsState: JournalsStateType = {
  journals: [],
  isLoading: false,
};

export const journalsReducer = (
  state: JournalsStateType,
  action: JournalsActionType
) => {
  switch (action.type) {
    case 'SET_JOURNALS':
      return {
        ...state,
        journals: action.payload,
        isLoading: false,
      };
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export const useJournalsReducer = () =>
  useReducer(journalsReducer, initialJournalsState);

export const getJournals = async (
  dispatch: Dispatch<JournalsActionType>,
  showNotification: any
) => {
  try {
    dispatch({ type: 'START_LOADING' });
    const user = auth.currentUser!;
    const journalsRef = db
      .collection('users')
      .doc(user.uid)
      .collection('journals');
    const journalsSnapshot = await journalsRef.get();
    let journalsData: Journal[] = [];
    journalsSnapshot.forEach((journal) => {
      journalsData.push({
        id: journal.id,
        title: journal.data().title,
        content: journal.data().content,
        createdAt: journal.data().createdAt,
      });
      dispatch({ type: 'SET_JOURNALS', payload: journalsData });
    });
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const addJournal = async (
  journal: JournalFormData,
  dispatch: Dispatch<JournalsActionType>,
  showNotification: any
) => {
  const user = auth.currentUser!;
  const journalsRef = db
    .collection('users')
    .doc(user.uid)
    .collection('journals');
  try {
    const journalData = {
      title: journal.title,
      content: journal.content,
      createdAt: new Date(),
    };
    await journalsRef.add(journalData);
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const editJournal = async (
  id: string,
  journal: JournalFormData,
  dispatch: Dispatch<JournalsActionType>,
  showNotification: any
) => {
  const { title, content } = journal;
  const user = auth.currentUser!;
  const editedJournalRef = db
    .collection('users')
    .doc(user.uid)
    .collection('journals')
    .doc(id);
  editedJournalRef
    .set({ content, title }, { merge: true })
    .then(() => {
      showNotification({ message: 'Journal updated', type: 'success' });
    })
    .catch(({ message }) => showNotification({ message, type: 'error' }));
};

export const deleteJournal = async (
  id: string,
  dispatch: Dispatch<JournalsActionType>,
  closeModal: any,
  showNotification: any
) => {
  const user = auth.currentUser!;
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .collection('journals')
      .doc(id)
      .delete();
    closeModal();
    showNotification({ message: 'Journal deleted', type: 'success' });
  } catch ({ message }) {
    closeModal();
    showNotification({ message, type: 'error' });
  }
};
