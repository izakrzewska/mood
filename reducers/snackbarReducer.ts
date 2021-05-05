interface SnackbarState {
  visible: boolean;
  version?: 'success' | 'error';
  message?: string;
}

export const initialSnackbarState = {
  visible: false,
  version: undefined,
  message: undefined,
};

export type SnackbarAction =
  | { type: 'SHOW'; payload: { version: 'success' | 'error'; message: string } }
  | { type: 'HIDE' };

export const snackbarReducer = (
  state: SnackbarState,
  action: SnackbarAction
): SnackbarState => {
  switch (action.type) {
    case 'SHOW': {
      return {
        ...state,
        visible: true,
        version: action.payload.version,
        message: action.payload.message,
      };
    }
    case 'HIDE':
      return {
        ...state,
        visible: false,
        version: undefined,
        message: undefined,
      };
    default:
      return state;
  }
};
