import { UserStateType, UserActionType } from './types';
import { db, auth } from '../../firebase';
import { useReducer, Dispatch } from 'react';
import firebase from 'firebase/app';
import {
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from '../../screens/userManagementScreens/types';
import {
  EditUsernameFormData,
  EditEmailFormData,
  EditPasswordFormData,
  DeleteAccountFormData,
} from '../../types';

export const initialUserState: UserStateType = {
  user: [],
  isLoading: false,
};

export const userReducer = (state: UserStateType, action: UserActionType) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
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

export const useUserReducer = () => useReducer(userReducer, initialUserState);

const getCredentials = (password: string) => {
  const user = auth.currentUser!;
  return firebase.auth.EmailAuthProvider.credential(user.email!, password);
};

export const login = async (
  data: LoginFormData,
  dispatch: Dispatch<UserActionType>,
  showNotification: any
) => {
  const { email, password } = data;
  try {
    await auth.signInWithEmailAndPassword(email.trim().toLowerCase(), password);
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const register = async (
  data: RegisterFormData,
  dispatch: Dispatch<UserActionType>,
  showNotification: any
) => {
  const { email, password } = data;
  try {
    await auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then((response) => {
        const user = response.user;
        user
          ?.updateProfile({ displayName: data.username })
          .catch(({ message }) => showNotification({ message, type: 'error' }));
      });
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const resetPassword = async (
  data: ResetPasswordFormData,
  dispatch: Dispatch<UserActionType>,
  showNotification: any
) => {
  const { email } = data;
  try {
    await auth.sendPasswordResetEmail(email.trim().toLowerCase());
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const updateUsername = async (
  data: EditUsernameFormData,
  showNotification: any
) => {
  const user = auth.currentUser!;
  try {
    await user.updateProfile({ displayName: data.username }).then(() => {
      showNotification({ message: 'Username updated', type: 'success' });
    });
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const updateEmail = async (
  data: EditEmailFormData,
  showNotification: any
) => {
  const user = auth.currentUser!;
  try {
    await user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user
          .updateEmail(data.email)
          .then(() => {
            showNotification({ message: 'E-mail updated', type: 'success' });
          })
          .catch(({ message }) => {
            showNotification({ message, type: 'error' });
          });
      });
  } catch ({ message }) {
    showNotification({ message, type: 'error' });
  }
};

export const updatePassword = async (
  data: EditPasswordFormData,
  showNotification: any
) => {
  const user = auth.currentUser!;
  user
    .reauthenticateWithCredential(getCredentials(data.oldPassword))
    .then(() => {
      user
        .updatePassword(data.password)
        .then(() => {
          showNotification({ message: 'Password updated', type: 'success' });
        })
        .catch(({ message }) => {
          showNotification({ message, type: 'error' });
        });
    })
    .catch(({ message }) => {
      showNotification({ message, type: 'error' });
    });
};

export const deleteAccount = async (
  data: DeleteAccountFormData,
  showNotification: any
) => {
  const user = auth.currentUser!;
  user
    .reauthenticateWithCredential(getCredentials(data.password))
    .then(() => {
      user
        .delete()
        .then(() => {
          // TODO: remove user data
        })
        .catch(({ message }) => {
          showNotification({ message, type: 'error' });
        });
    })
    .catch(({ message }) => showNotification({ message, type: 'error' }));
};
