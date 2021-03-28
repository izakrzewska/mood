import React, { FC, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { RegisterFormData } from '../../types';
import { TextInput } from 'react-native-paper';
import { MainButton } from '../MainButton/MainButton';
import {
  EmailController,
  FormError,
  PasswordController,
  UserNameController,
} from './components';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, watch, reset } = useForm<
    RegisterFormData
  >({
    reValidateMode: 'onBlur',
  });

  const password = useRef({});
  const currentPassword = (password.current = watch('password', ''));
  return (
    <View>
      <UserNameController control={control} />
      <FormError error={errors.username} />
      <EmailController control={control} />
      <FormError error={errors.email} />
      <PasswordController control={control} name='password' label='Password' />
      <FormError error={errors.password} />
      <PasswordController
        name='passwordConf'
        label='password'
        control={control}
        confirmation
        currentPassword={currentPassword}
      />
      <FormError error={errors.passwordConf} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Register account'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
