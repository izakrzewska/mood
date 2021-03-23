import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { ForgotPasswordImage, MainButton, FormError } from '../../components';
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

type ResetPasswordFormData = {
  email: string;
};

export const ResetPasswordScreen: FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const { control, handleSubmit, errors, watch, register } = useForm<
    ResetPasswordFormData
  >();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: ResetPasswordFormData) => {
    const { email } = data;

    auth
      .sendPasswordResetEmail(email.trim().toLowerCase())
      .then((response) => console.log(response)) // TODO: add notification that send and clear inputs
      .catch((error) => console.log(error)); // TODO: add notifiaction than not send and display error
  };

  return (
    <View style={styles.authFormContainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='E-mail'
            mode='outlined'
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='email'
        rules={{
          required: { value: true, message: 'This field is required' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid e-mail address',
          },
        }}
        defaultValue=''
      />
      <FormError error={errors.email} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Reset password'
      />
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
    </View>
  );
};
