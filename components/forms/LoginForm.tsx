import React, { FC } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FormError, MainButton } from '../../components';
import styles from './styles';
import { LoginFormData } from '../../types';

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useForm<LoginFormData>({
    reValidateMode: 'onBlur',
  });
  return (
    <View>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='E-mail'
            mode='outlined'
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.formInput}
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='Password'
            mode='outlined'
            secureTextEntry
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            style={styles.formInput}
          />
        )}
        name='password'
        rules={{
          required: { value: true, message: 'This field is required' },
          minLength: {
            value: 6,
            message: 'Password must have at least 6 characters',
          },
        }}
        defaultValue=''
      />
      <FormError error={errors.password} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Sign in'
      />
    </View>
  );
};
