import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  AuthNavigationBox,
  ErrorNotification,
  LoginImage,
  RegisterForm,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';
import { RegisterFormData, IError } from '../../types';
import styles from './styles';

type RegisterScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Register'
>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const [error, setError] = useState<IError>();

  const onSubmit = (data: RegisterFormData) => {
    Keyboard.dismiss();
    const { email, password } = data;
    auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then((response) => {
        const user = response.user;
        user
          ?.updateProfile({ displayName: data.username })
          .catch((error) => setError(error));
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
      <View style={styles.authFormContainer}>
        <RegisterForm onSubmit={onSubmit} />
        <View style={styles.imageContainer}>
          <LoginImage />
        </View>
        <AuthNavigationBox
          questionText='Do you already have an account?'
          buttonText='Sign in'
          onButtonPress={() => navigation.navigate('Login')}
        />
      </View>
      <ErrorNotification error={error} />
    </>
  );
};
