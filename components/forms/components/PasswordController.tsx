import React, { FC } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller, Control } from 'react-hook-form';
import { LoginFormData, RegisterFormData } from '../../../types';

interface PasswordControllerProps {
  control: Control<LoginFormData | RegisterFormData>;
  confirmation?: boolean;
  currentPassword?: string;
}

export const PasswordController: FC<PasswordControllerProps> = ({
  control,
  confirmation = false,
  currentPassword,
}) => {
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          label={confirmation ? 'Confirm password' : 'Password'}
          mode='outlined'
          secureTextEntry
          onBlur={onBlur}
          onChangeText={(value) => onChange(value)}
          value={value}
        />
      )}
      name={confirmation ? 'passwordConf' : 'password'}
      rules={{
        required: { value: true, message: 'This field is required' },
        minLength: {
          value: 6,
          message: 'Password must have at least 6 characters',
        },
        validate: confirmation
          ? (value) =>
              value === currentPassword || 'The passwords does not match'
          : undefined,
      }}
      defaultValue=''
    />
  );
};
