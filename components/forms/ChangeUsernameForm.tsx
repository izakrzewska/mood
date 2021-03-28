import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { auth } from '../../firebase';
import { EditUsernameFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { UserNameController } from './components';

interface ChangeUsernameFormProps {
  closeForm: () => void;
  handleUsernameSave: (data: EditUsernameFormData) => void;
}

export const ChangeUsernameForm: FC<ChangeUsernameFormProps> = ({
  closeForm,
  handleUsernameSave,
}) => {
  const user = auth.currentUser!;
  const { handleSubmit, errors, control } = useForm<EditUsernameFormData>();
  return (
    <View>
      <UserNameController
        control={control}
        defaultValue={user.displayName!}
        error={errors.username}
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
          onPress={handleSubmit(handleUsernameSave)}
          text='Save'
        />
      </View>
    </View>
  );
};
