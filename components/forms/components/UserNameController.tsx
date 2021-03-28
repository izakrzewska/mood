import React, { FC } from 'react';
import { Controller, Control } from 'react-hook-form';
import { EditUsernameFormData, RegisterFormData } from '../../../types';
import { TextInput } from 'react-native-paper';

interface UserNameControllerProps {
  control: Control<RegisterFormData | EditUsernameFormData>;
  defaultValue?: string;
}

export const UserNameController: FC<UserNameControllerProps> = ({
  control,
  defaultValue,
}) => {
  return (
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
  );
};
