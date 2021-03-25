import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { RegisterFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { EmailController, FormError, PasswordController } from './components';

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
      <EmailController control={control} />
      <FormError error={errors.email} />
      <PasswordController control={control} />
      <FormError error={errors.password} />
      <PasswordController
        control={control}
        confirmation
        currentPassword={currentPassword}
      />
      <FormError error={errors.passwordConf} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Register account'
      />
    </View>
  );
};
