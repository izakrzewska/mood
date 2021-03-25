import React, { FC, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { MainButton } from '../MainButton/MainButton';
import { ResetPasswordFormData } from '../../types';
import { EmailController, FormError } from './components';

interface ResetPasswordFormProps {
  onSubmit: (data: ResetPasswordFormData) => void;
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, watch } = useForm<
    ResetPasswordFormData
  >({
    reValidateMode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');

  return (
    <View>
      <EmailController control={control} />
      <FormError error={errors.email} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Reset password'
        extraStyles={{ marginTop: 20 }}
      />
    </View>
  );
};
