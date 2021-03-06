import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { LoginFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { EmailController, PasswordController } from './components';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm<LoginFormData>({
    reValidateMode: 'onBlur',
  });
  return (
    <View>
      <EmailController control={control} error={errors.email} />
      <PasswordController
        control={control}
        name='password'
        label='Password'
        error={errors.password}
      />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Sign in'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
