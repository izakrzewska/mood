import React, { FC, useRef } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles';
import { TextInput } from 'react-native-paper';
import { FormError, MainButton } from '../../components';
import { RegisterFormData } from '../../types';

interface RegisterFormProps {
  onSubmit: any; // TODO: add type
}

export const RegisterForm: FC<RegisterFormProps> = ({ onSubmit }) => {
  const { control, handleSubmit, errors, watch, reset } = useForm<
    RegisterFormData
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='Password'
            mode='outlined'
            secureTextEntry
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
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
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='Confirm password'
            mode='outlined'
            secureTextEntry
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='passwordConf'
        rules={{
          required: { value: true, message: 'This field is required' },
          validate: (value) =>
            value === password.current || 'The passwords does not match',
        }}
        defaultValue=''
      />
      <FormError error={errors.passwordConf} />
      <MainButton
        mode='contained'
        onPress={handleSubmit(onSubmit)}
        text='Register account'
      />
    </View>
  );
};
