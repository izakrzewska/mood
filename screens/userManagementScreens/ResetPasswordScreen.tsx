import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, Text, View } from 'react-native';
import {
  AuthNavigationBox,
  ErrorNotification,
  ForgotPasswordImage,
  ResetPasswordForm,
} from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';
import { ResetPasswordFormData, IError } from '../../types';
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
  const [error, setError] = useState<IError>();
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

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
    <>
      <View style={styles.authFormContainer}>
        {isEmailSent ? (
          emailSentInfo
        ) : (
          <ResetPasswordForm onSubmit={onSubmit} />
        )}
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
    </>
  );
};
