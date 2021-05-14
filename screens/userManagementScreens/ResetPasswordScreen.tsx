import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Keyboard, View } from 'react-native';
import {
  AuthNavigationBox,
  ForgotPasswordImage,
  ResetPasswordForm,
} from '../../components';
import { useNotificationContext } from '../../context';
import { resetPassword, useUserReducer } from '../../reducers/user/userReducer';
import styles from './styles';
import {
  ResetPasswordFormData,
  ResetPasswordScreenNavigationProp,
} from './types';

export const ResetPasswordScreen: FC = () => {
  const navigation = useNavigation<ResetPasswordScreenNavigationProp>();
  const [state, dispatch] = useUserReducer();
  const { showNotification } = useNotificationContext();

  const onSubmit = (data: ResetPasswordFormData) => {
    Keyboard.dismiss();
    resetPassword(data, dispatch, showNotification);
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
