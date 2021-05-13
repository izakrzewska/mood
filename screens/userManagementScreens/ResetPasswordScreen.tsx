import React, { FC } from 'react';
import { Keyboard, View } from 'react-native';
import { useAuth } from 'reactfire';
import {
  AuthNavigationBox,
  ForgotPasswordImage,
  ResetPasswordForm,
} from '../../components';
import { useNotificationContext } from '../../context';
import styles from './styles';
import {
  ResetPasswordFormData,
  ResetPasswordScreenNavigationProp,
} from './types';

type RegisterScreenProps = {
  navigation: ResetPasswordScreenNavigationProp;
};

export const ResetPasswordScreen: FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const auth = useAuth();
  const { showNotification } = useNotificationContext();

  const onSubmit = async (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    const { email } = data;
    try {
      await auth.sendPasswordResetEmail(email.trim().toLowerCase());
    } catch ({ message }) {
      showNotification({ message, type: 'error' });
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
