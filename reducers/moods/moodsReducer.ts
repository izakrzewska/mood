import { MoodsStateType, MoodsActionType } from './types';
import { db, auth } from '../../firebase';
import { Mood, MoodFormData } from './types';
import { useReducer, Dispatch } from 'react';

export const initialMoodsState: MoodsStateType = {
  moods: [],
  isLoading: false,
};

export const moodsReducer = (
  state: MoodsStateType,
  action: MoodsActionType
) => {
  switch (action.type) {
    case 'SET_MOODS':
      return {
        ...state,
        moods: action.payload,
        isLoading: false,
      };
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'FINISH_LOADING': {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export const useMoodsReducer = () =>
  useReducer(moodsReducer, initialMoodsState);

export const getMoods = async (
  dispatch: Dispatch<MoodsActionType>,
  showNotification: any
) => {
  const user = auth.currentUser!;
  const moodsRef = db.collection('users').doc(user.uid).collection('moods');
  try {
    dispatch({ type: 'START_LOADING' });
    const moodsSnapshot = await moodsRef.get();
    let moodsData: Mood[] = [];
    moodsSnapshot.forEach((mood) => {
      moodsData.push({
        id: mood.id,
        value: mood.data().value,
        createdAt: mood.data().createdAt,
      });
      dispatch({ type: 'SET_MOODS', payload: moodsData });
    });
  } catch ({ message }) {
    dispatch({ type: 'FINISH_LOADING' });
    showNotification({ message, type: 'error' });
  }
};

export const addMood = async (
  mood: MoodFormData,
  dispatch: Dispatch<MoodsActionType>,
  showNotification: any
) => {
  const user = auth.currentUser!;
  const moodsRef = db.collection('users').doc(user.uid).collection('moods');
  dispatch({ type: 'START_LOADING' });
  try {
    const moodData = {
      value: Number(mood.value),
      createdAt: new Date(),
    };
    await moodsRef.add(moodData);
    dispatch({ type: 'FINISH_LOADING' });
  } catch ({ message }) {
    dispatch({ type: 'FINISH_LOADING' });
    showNotification({ message, type: 'error' });
  }
};

export const editMood = async (
  id: string,
  mood: MoodFormData,
  dispatch: Dispatch<MoodsActionType>,
  showNotification: any
) => {
  const { value } = mood;
  const user = auth.currentUser!;
  const editedMoodRef = db
    .collection('users')
    .doc(user.uid)
    .collection('moods')
    .doc(id);
  editedMoodRef
    .set({ value: Number(value) }, { merge: true })
    .then(() => {
      showNotification({ message: 'Mood updated', type: 'success' });
    })
    .catch(({ message }) => showNotification({ message, type: 'error' }));
};

export const deleteMood = async (
  id: string,
  dispatch: Dispatch<MoodsActionType>,
  closeModal: any,
  showNotification: any
) => {
  const user = auth.currentUser!;
  try {
    await db
      .collection('users')
      .doc(user.uid)
      .collection('moods')
      .doc(id)
      .delete();
    closeModal();
    showNotification({ message: 'Mood deleted', type: 'success' });
  } catch ({ message }) {
    closeModal();
    showNotification({ message, type: 'error' });
  }
};
