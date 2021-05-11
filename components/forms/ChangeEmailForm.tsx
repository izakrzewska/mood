import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { EditEmailFormData } from '../../types';
import { EmailController, PasswordController } from './components';
import { MainButton } from '../MainButton/MainButton';

interface ChangeEmailFormProps {
  email: string;
  handleEmailSave: (data: EditEmailFormData) => void;
}

export const ChangeEmailForm: FC<ChangeEmailFormProps> = ({
  handleEmailSave,
  email,
}) => {
  const { handleSubmit, errors, control } = useForm<EditEmailFormData>();
  return (
    <View>
      <EmailController
        control={control}
        defaultValue={email!}
        error={errors.email}
      />
      <PasswordController
        label='Password'
        name='password'
        control={control}
        error={errors.password}
      />
      <MainButton
        mode='text'
        onPress={handleSubmit(handleEmailSave)}
        text='Save'
        extraStyles={{
          alignSelf: 'flex-end',
          marginVertical: 10,
        }}
      />
    </View>
  );
};
