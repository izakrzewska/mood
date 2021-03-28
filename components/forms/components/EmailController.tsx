import React, { FC } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller, Control } from 'react-hook-form';
import {
  EditEmailFormData,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
} from '../../../types';

interface EmailControllerProps {
  control: Control<
    LoginFormData | RegisterFormData | ResetPasswordFormData | EditEmailFormData
  >;
  defaultValue?: string;
}

export const EmailController: FC<EmailControllerProps> = ({
  control,
  defaultValue,
}) => {
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          label='E-mail'
          mode='outlined'
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
      defaultValue={defaultValue || ''}
    />
  );
};

export default EmailController;
