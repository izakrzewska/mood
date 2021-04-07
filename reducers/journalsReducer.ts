import { IJournalFetched } from '../types';

interface JournalsState {
  isLoading: boolean;
  journals: IJournalFetched[];
  openId?: string;
}

export const initialJournalsState = {
  isLoading: false,
  journals: [],
  openId: undefined,
};

type JournalsAction =
  | { type: 'START_LOADING' }
  | { type: 'SET_JOURNALS'; payload: IJournalFetched[] }
  | { type: 'SET_OPEN'; payload: string | undefined };

export const journalsReducer = (
  state: JournalsState,
  action: JournalsAction
) => {
  switch (action.type) {
    case 'START_LOADING': {
      return {
        ...state,
        isLoading: true,
      };
    }
    case 'SET_JOURNALS':
      return {
        ...state,
        isLoading: false,
        journals: action.payload,
      };
    case 'SET_OPEN':
      return {
        ...state,
        openId: action.payload,
      };
    default:
      return state;
  }
};
