import { IJournalFetched, IError } from '../../types';

export type JournalsAction =
  | { type: 'SET_JOURNALS'; payload: IJournalFetched[] }
  | { type: 'SET_OPEN_ID'; pyaload?: string }
  | { type: 'START_LOADING' }
  | { type: 'STOP_LOADING' }
  | { type: 'SET_ERROR'; payload: IError };

export type JournalsDispatch = (action: JournalsAction) => void;
export type JournalsProviderProps = { children: React.ReactNode };

export type JournalsState = {
  journals?: IJournalFetched[];
  openId?: string;
  isLoading: boolean;
  error?: IError;
};

export type JournalStateContextType = {
  state: JournalsState;
  dispatch: JournalsDispatch;
};
