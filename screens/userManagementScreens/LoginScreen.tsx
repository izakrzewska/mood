import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import {
  ErrorNotification,
  LoginForm,
  LoginImage,
  MainButton,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';
import { LoginFormData } from '../../types';
import styles from './styles';

type LoginScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Login'
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const [error, setError] = useState();

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
      <View style={styles.switchScreenText}>
        <Text>Forgot password?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => {
          navigation.navigate('ResetPassword');
        }}
        text='Reset password'
      />
      <View style={styles.switchScreenText}>
        <Text>Don't have an account yet?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => navigation.navigate('Register')}
        text='Register account'
      />
      <ErrorNotification error={error} />
    </View>
  );
};
