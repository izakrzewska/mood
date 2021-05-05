import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import {
  AuthNavigationBox,
  ErrorNotification,
  LoginForm,
  LoginImage,
} from '../../components';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';
import { LoginFormData, IError } from '../../types';
import styles from './styles';
import { logIn } from '../../services/userService';

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
    const { email, password } = data;
    logIn(email, password);
  };

  return (
    <>
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
      <ErrorNotification error={error} />
    </>
  );
};
