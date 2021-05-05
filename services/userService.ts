import { auth, db } from '../firebase';
import firebase from 'firebase';
import { Keyboard } from 'react-native';

const getCredentials = (password: string) => {
  const user = auth.currentUser!;
  return firebase.auth.EmailAuthProvider.credential(user.email!, password);
};

export const logIn = (email: string, password: string) => {
  Keyboard.dismiss();
  auth
    .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
    .catch((error) => {
      console.log('error', error);
    });
};

export const signOut = () => {
  auth.signOut();
};
