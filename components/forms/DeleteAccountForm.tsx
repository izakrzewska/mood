import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { DeleteAccountFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { PasswordController } from './components';

interface DeleteAccountFormProps {
  handleDelete: (data: DeleteAccountFormData) => void;
}

export const DeleteAccountForm: FC<DeleteAccountFormProps> = ({
  handleDelete,
}) => {
  const { handleSubmit, errors, control } = useForm<DeleteAccountFormData>();
  return (
    <View>
      <PasswordController
        label='Password'
        name='password'
        control={control}
        error={errors.password}
      />
      <MainButton
        mode='text'
        onPress={handleSubmit(handleDelete)}
        text='Save'
        extraStyles={{
          alignSelf: 'flex-end',
          marginVertical: 10,
        }}
      />
    </View>
  );
};
