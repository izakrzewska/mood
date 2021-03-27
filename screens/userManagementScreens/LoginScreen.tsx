import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  AuthNavigationBox,
  ErrorNotification,
  LoginForm,
  LoginImage,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';
import { LoginFormData, IError } from '../../types';
import styles from './styles';

type LoginScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Login'
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [error, setError] = useState<IError>();

  const onSubmit = (data: LoginFormData) => {
    Keyboard.dismiss();
    const { email, password } = data;
    auth
      .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
      .catch((error) => {
        setError(error);
      });
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
      <ErrorNotification error={error} />
    </View>
  );
};
