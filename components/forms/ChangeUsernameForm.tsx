import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { EditUsernameFormData } from '../../types';
import { MainButton } from '../MainButton/MainButton';
import { UserNameController } from './components';

interface ChangeUsernameFormProps {
  displayName: string | null;
  handleUsernameSave: (data: EditUsernameFormData) => void;
}

export const ChangeUsernameForm: FC<ChangeUsernameFormProps> = ({
  handleUsernameSave,
  displayName,
}) => {
  const { handleSubmit, errors, control } = useForm<EditUsernameFormData>();
  return (
    <View>
      <UserNameController
        control={control}
        defaultValue={displayName === null ? '' : displayName}
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
