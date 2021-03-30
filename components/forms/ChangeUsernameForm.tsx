import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { auth } from '../../firebase';
import { EditUsernameFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { UserNameController } from './components';

interface ChangeUsernameFormProps {
  handleUsernameSave: (data: EditUsernameFormData) => void;
}

export const ChangeUsernameForm: FC<ChangeUsernameFormProps> = ({
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
      <MainButton
        mode='text'
        onPress={handleSubmit(handleUsernameSave)}
        text='Save'
        extraStyles={{
          alignSelf: 'flex-end',
          marginVertical: 10,
        }}
      />
    </View>
  );
};
