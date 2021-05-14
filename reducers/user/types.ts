export type UserStateType = {
  user: any;
  isLoading: boolean;
};

export type UserActionType =
  | {
      type: 'SET_USER';
      payload: any;
    }
  | { type: 'START_LOADING' }
  | { type: 'FINISH_LOADING' };
