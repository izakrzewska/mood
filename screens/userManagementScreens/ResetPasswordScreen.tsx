import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import {
  AuthNavigationBox,
  ErrorNotification,
  ForgotPasswordImage,
  ResetPasswordForm,
  SuccessNotification,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';
import { ResetPasswordFormData, IError } from '../../types';
import styles from './styles';
import { useNotifySuccess } from '../../hooks';

type ResetPasswordScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'ResetPassword'
>;

type RegisterScreenProps = {
  navigation: ResetPasswordScreenNavigationProp;
};

export const ResetPasswordScreen: FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const [error, setError] = useState<IError>();
  const { openSuccess, isActive, message } = useNotifySuccess();

  const onSubmit = (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    const { email } = data;

    auth
      .sendPasswordResetEmail(email.trim().toLowerCase())
      .then(() => {
        openSuccess('Reset password link sent. Check your inbox to proceed.');
      })
      .catch((error) => {
        setError(error);
      });
  };

  return (
    <>
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
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
