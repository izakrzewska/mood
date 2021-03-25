import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View, Keyboard } from 'react-native';
import { ResetPasswordFormData } from '../../types';

import { TextInput } from 'react-native-paper';
import {
  ForgotPasswordImage,
  MainButton,
  FormError,
  ErrorNotification,
  ResetPasswordForm,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';
import styles from './styles';

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
  const [error, setError] = useState();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const onSubmit = (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    const { email } = data;

    auth
      .sendPasswordResetEmail(email.trim().toLowerCase())
      .then(() => {
        setIsEmailSent(true);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const emailSentInfo = (
    <View>
      <Text>Email sent. Check your inbox.</Text>
    </View>
  );

  return (
    <View style={styles.authFormContainer}>
      {isEmailSent ? emailSentInfo : <ResetPasswordForm onSubmit={onSubmit} />}
      <View style={styles.imageContainer}>
        <ForgotPasswordImage />
      </View>
      <View style={styles.switchScreenText}>
        <Text>Back to login page?</Text>
      </View>
      <MainButton
        text='Sign in'
        mode='outlined'
        onPress={() => navigation.goBack()}
      />
      <ErrorNotification error={error} />
    </View>
  );
};
