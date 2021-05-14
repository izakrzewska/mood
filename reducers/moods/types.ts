export type MoodsStateType = {
  moods: Mood[];
  isLoading: boolean;
};

export type MoodsActionType =
  | {
      type: 'SET_MOODS';
      payload: Mood[];
    }
  | { type: 'START_LOADING' }
  | { type: 'FINISH_LOADING' };

export type Mood = {
  id: string;
  value: number;
  createdAt: any; // TODO: change type
};

export type MoodFormData = {
  value: number;
};
