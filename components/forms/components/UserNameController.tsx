import React, { FC } from 'react';
import { Controller, Control, FieldError } from 'react-hook-form';
import { EditUsernameFormData, RegisterFormData } from '../../../types';
import { TextInput } from 'react-native-paper';
import { FormError } from './FormError';

interface UserNameControllerProps {
  control: Control<RegisterFormData | EditUsernameFormData>;
  defaultValue?: string;
  error?: FieldError;
}

export const UserNameController: FC<UserNameControllerProps> = ({
  control,
  defaultValue,
  error,
}) => {
  return (
    <>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='Username'
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='username'
        rules={{
          required: { value: true, message: 'This field is required' },
        }}
        defaultValue={defaultValue || ''}
      />
      <FormError error={error} />
    </>
  );
};
