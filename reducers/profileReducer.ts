interface ProfileState {
  openId?: string | undefined;
}
export const initialProfileState = {
  openId: undefined,
};

type ProfileAction = { type: 'SET_OPEN'; payload: string | undefined };

export const profileReducer = (state: ProfileState, action: ProfileAction) => {
  switch (action.type) {
    case 'SET_OPEN': {
      return {
        ...state,
        openId: action.payload,
      };
    }
    default:
      return state;
  }
};
