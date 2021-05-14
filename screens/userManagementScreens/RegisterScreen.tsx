import React, { FC } from 'react';
import { Keyboard, View } from 'react-native';
import { AuthNavigationBox, LoginImage, RegisterForm } from '../../components';
import { useNotificationContext } from '../../context';
import { register, useUserReducer } from '../../reducers/user/userReducer';
import styles from './styles';
import { RegisterFormData, RegisterScreenNavigationProp } from './types';
import { useNavigation } from '@react-navigation/native';

export const RegisterScreen: FC = () => {
  const [state, dispatch] = useUserReducer();
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { showNotification } = useNotificationContext();

  const onSubmit = (data: RegisterFormData) => {
    Keyboard.dismiss();
    register(data, dispatch, showNotification);
  };

  return (
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
  );
};
