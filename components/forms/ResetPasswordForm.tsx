import React, { useRef, FC } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { MainButton, FormError } from '../../components';
import { TextInput } from 'react-native-paper';
import { ResetPasswordFormData } from '../../types';
import styles from './styles';

interface ResetPasswordFormProps {
  onSubmit: any; // TODO: add type
}

export const ResetPasswordForm: FC<ResetPasswordFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, watch } = useForm<
    ResetPasswordFormData
  >({
    reValidateMode: 'onBlur',
  });
  const password = useRef({});
  password.current = watch('password', '');
  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='E-mail'
            mode='outlined'
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='email'
        rules={{
          required: { value: true, message: 'This field is required' },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid e-mail address',
          },
        }}
        defaultValue=''
      />
      <FormError error={errors.email} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Reset password'
      />
    </View>
  );
};
