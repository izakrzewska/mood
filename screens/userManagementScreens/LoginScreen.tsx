import React, { FC } from 'react';
import { Keyboard, View } from 'react-native';
import { AuthNavigationBox, LoginForm, LoginImage } from '../../components';
import { useNotificationContext } from '../../context';
import { login, useUserReducer } from '../../reducers/user/userReducer';
import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import { LoginFormData, LoginScreenNavigationProp } from './types';

export const LoginScreen: FC = () => {
  const [state, dispatch] = useUserReducer();
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const { showNotification } = useNotificationContext();

  const onSubmit = (data: LoginFormData) => {
    Keyboard.dismiss();
    login(data, dispatch, showNotification);
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
