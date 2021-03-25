import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import {
  ErrorNotification,
  LoginImage,
  MainButton,
  RegisterForm,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';
import { RegisterFormData } from '../../types';
import styles from './styles';

type RegisterScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Register'
>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const [error, setError] = useState();

  const onSubmit = (data: RegisterFormData) => {
    Keyboard.dismiss();
    const { email, password } = data;
    auth
      .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <View style={styles.authFormContainer}>
      <RegisterForm onSubmit={onSubmit} />
      <View style={styles.imageContainer}>
        <LoginImage />
      </View>
      <View style={styles.switchScreenText}>
        <Text>Do you already have an account?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => navigation.goBack()}
        text='Sign in'
      />
      <ErrorNotification error={error} />
    </View>
  );
};
