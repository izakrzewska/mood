export const forFade = ({ current }: any) => ({
  //TODO: add type
  cardStyle: {
    opacity: current.progress,
    backgroundColor: 'transparent',
  },
});

// auth errors
export const getErrorText = (error: any): string => {
  let errorText = '';
  switch (error.code) {
    case 'auth/user-not-found': {
      errorText = 'User not found';
      break;
    }
    case 'auth/wrong-password': {
      errorText = 'Invalid password';
      break;
    }
    case 'auth/email-already-in-use': {
      errorText = 'E-mail already in use';
      break;
    }
    default: {
      errorText = error.message;
    }
  }
  return errorText;
};
