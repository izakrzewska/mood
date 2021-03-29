import React, { FC, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller, Control, FieldError } from 'react-hook-form';
import {
  LoginFormData,
  RegisterFormData,
  EditPasswordFormData,
  EditEmailFormData,
  DeleteAccountFormData,
} from '../../../types';

import { colors } from '../../../themes';
import { FormError } from './FormError';

interface PasswordControllerProps {
  control: Control<
    | LoginFormData
    | RegisterFormData
    | EditPasswordFormData
    | EditEmailFormData
    | DeleteAccountFormData
  >;
  confirmation?: boolean;
  currentPassword?: string;
  label: string;
  name: string;
  error?: FieldError;
}

export const PasswordController: FC<PasswordControllerProps> = ({
  control,
  confirmation = false,
  label,
  currentPassword,
  name,
  error,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label={label}
            mode='outlined'
            secureTextEntry={!isPasswordVisible}
            onBlur={onBlur}
            onChangeText={(value) => {
              onChange(value);
            }}
            value={value}
            right={
              value && (
                <TextInput.Icon
                  color={colors.main}
                  name={isPasswordVisible ? 'eye' : 'eye-off'}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              )
            }
          />
        )}
        name={name}
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
      <FormError error={error} />
    </>
  );
};
