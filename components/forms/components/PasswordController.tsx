import React, { FC, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { Controller, Control } from 'react-hook-form';
import { LoginFormData, RegisterFormData } from '../../../types';

import { colors } from '../../../themes';

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  return (
    <Controller
      control={control}
      render={({ onChange, onBlur, value }) => (
        <TextInput
          label={confirmation ? 'Confirm password' : 'Password'}
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
