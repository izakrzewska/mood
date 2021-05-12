import React, { FC, useContext } from 'react';
import { Keyboard, View } from 'react-native';
import {
  AuthNavigationBox,
  ForgotPasswordImage,
  ResetPasswordForm,
} from '../../components';
import styles from './styles';
import {
  ResetPasswordScreenNavigationProp,
  ResetPasswordFormData,
} from './types';
import { useAuth } from 'reactfire';
import { NotificationContext, NotificationContextType } from '../../context';

type RegisterScreenProps = {
  navigation: ResetPasswordScreenNavigationProp;
};

export const ResetPasswordScreen: FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const auth = useAuth();
  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContextType;

  const onSubmit = async (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    const { email } = data;
    try {
      await auth.sendPasswordResetEmail(email.trim().toLowerCase());
    } catch ({ message }) {
      showNotification(message, 'error');
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <ResetPasswordForm onSubmit={onSubmit} />
      <View style={styles.imageContainer}>
        <ForgotPasswordImage />
      </View>
      <AuthNavigationBox
        questionText='Back to login page?'
        buttonText='Sign in'
        onButtonPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
