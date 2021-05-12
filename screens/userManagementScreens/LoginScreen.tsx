import React, { FC, useContext } from 'react';
import { Keyboard, View } from 'react-native';
import { useAuth } from 'reactfire';
import { AuthNavigationBox, LoginForm, LoginImage } from '../../components';
import styles from './styles';
import { LoginScreenNavigationProp, LoginFormData } from './types';
import { NotificationContext, NotificationContextType } from '../../context';

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const auth = useAuth();
  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContextType;

  const onSubmit = async (data: LoginFormData) => {
    Keyboard.dismiss();
    const { email, password } = data;

    try {
      await auth.signInWithEmailAndPassword(
        email.trim().toLowerCase(),
        password
      );
    } catch ({ message }) {
      showNotification(message, 'error');
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <LoginForm onSubmit={onSubmit} />
      <View style={styles.imageContainer}>
        <LoginImage />
      </View>
      <AuthNavigationBox
        questionText='Forgot password?'
        buttonText='Reset password'
        onButtonPress={() => navigation.navigate('ResetPassword')}
      />
      <AuthNavigationBox
        questionText="Don't have an account yet?"
        buttonText='Register account'
        onButtonPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
