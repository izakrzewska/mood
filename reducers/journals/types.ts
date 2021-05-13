export type JournalsStateType = {
  journals: Journal[];
  isLoading: boolean;
};

export type JournalsActionType =
  | {
      type: 'SET_JOURNALS';
      payload: Journal[];
    }
  | { type: 'START_LOADING' };

export type Journal = {
  id: string;
  content: string;
  title: string;
  createdAt: any; // TODO: change type
};

export type JournalFormData = {
  title: string;
  content: string;
};
