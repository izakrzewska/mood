import React, { FC, useRef } from 'react';
import { View } from 'react-native';
import { PasswordController } from './components';
import { MainButton } from '../MainButton/MainButton';
import { useForm } from 'react-hook-form';
import { EditPasswordFormData } from '../../types';

interface ChangePasswordFormProps {
  closeEdit: () => void;
  handlePasswordSave: (data: EditPasswordFormData) => void;
}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = ({
  closeEdit,
  handlePasswordSave,
}) => {
  const { handleSubmit, errors, control, watch } = useForm<
    EditPasswordFormData
  >();

  const password = useRef({});
  const currentPassword = (password.current = watch('password', ''));
  return (
    <View>
      <PasswordController
        label='Old password'
        name='oldPassword'
        control={control}
        error={errors.oldPassword}
      />
      <PasswordController
        control={control}
        label='New password'
        name='password'
        error={errors.password}
      />
      <PasswordController
        control={control}
        confirmation
        currentPassword={currentPassword}
        label='New password confirmation'
        name='passwordConf'
        error={errors.passwordConf}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginTop: 10,
        }}
      >
        <MainButton mode='text' onPress={closeEdit} text='Close' />
        <MainButton
          mode='text'
          onPress={handleSubmit(handlePasswordSave)}
          text='Save'
        />
      </View>
    </View>
  );
};
