import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View, Text } from 'react-native';
import { EditEmailFormData } from '../../types';
import { EmailController, PasswordController } from './components';
import { auth } from '../../firebase';
import { MainButton } from '../MainButton/MainButton';

interface ChangeEmailFormProps {
  closeForm: () => void;
  handleEmailSave: (data: EditEmailFormData) => void;
}

export const ChangeEmailForm: FC<ChangeEmailFormProps> = ({
  closeForm,
  handleEmailSave,
}) => {
  const user = auth.currentUser!;
  const { handleSubmit, errors, control } = useForm<EditEmailFormData>();
  return (
    <View>
      <EmailController
        control={control}
        defaultValue={user.email!}
        error={errors.email}
      />
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
          onPress={handleSubmit(handleEmailSave)}
          text='Save'
        />
      </View>
    </View>
  );
};
