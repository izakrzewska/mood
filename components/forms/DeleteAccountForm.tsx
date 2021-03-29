import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { auth } from '../../firebase';
import { DeleteAccountFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { PasswordController } from './components';

interface DeleteAccountFormProps {
  closeForm: () => void;
  handleDelete: (data: DeleteAccountFormData) => void;
}

export const DeleteAccountForm: FC<DeleteAccountFormProps> = ({
  closeForm,
  handleDelete,
}) => {
  const user = auth.currentUser!;
  const { handleSubmit, errors, control } = useForm<DeleteAccountFormData>();
  return (
    <View>
      <PasswordController
        label='Password'
        name='password'
        control={control}
        error={errors.password}
      />
      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'flex-end',
          marginTop: 10,
        }}
      >
        <MainButton mode='text' onPress={closeForm} text='Close' />
        <MainButton
          mode='text'
          onPress={handleSubmit(handleDelete)}
          text='Save'
        />
      </View>
    </View>
  );
};
