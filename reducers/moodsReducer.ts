interface MoodsState {
  isUsernameinEdit: boolean;
  isEmailInEdit: boolean;
  isPasswordInEdit: boolean;
  isAccountRemoval: boolean;
}

export const moodsReducer = (state: MoodsState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_USERNAME_EDIT':
      return {
        isUsernameinEdit: !state.isUsernameinEdit,
        isEmailInEdit: false,
        isPasswordInEdit: false,
        isAccountRemoval: false,
      };
    case 'TOGGLE_EMAIL_EDIT':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: !state.isEmailInEdit,
        isPasswordInEdit: false,
        isAccountRemoval: false,
      };
    case 'TOGGLE_PASSWORD_EDIT':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: false,
        isPasswordInEdit: !state.isPasswordInEdit,
        isAccountRemoval: false,
      };
    case 'TOGGLE_ACCOUNT_REMOVAL':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: false,
        isPasswordInEdit: false,
        isAccountRemoval: !state.isAccountRemoval,
      };
    default:
      return state;
  }
};
