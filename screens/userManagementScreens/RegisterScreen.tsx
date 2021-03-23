import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { FormError, MainButton, LoginImage } from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';
import styles from './styles';

type RegisterScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Register'
>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

type RegisterFormData = {
  email: string;
  password: string;
  passwordConf: string;
};

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const { control, handleSubmit, errors, watch, register } = useForm<
    RegisterFormData
  >();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = (data: RegisterFormData) => {
    const { email, password } = data;
    auth.createUserWithEmailAndPassword(email.trim().toLowerCase(), password);
  };
  return (
    <View style={styles.authFormContainer}>
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
      <View style={styles.imageContainer}>
        <LoginImage />
      </View>
      <View style={styles.switchScreenText}>
        <Text>Do you already have an account?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => navigation.goBack()}
        text='Sign in'
      />
    </View>
  );
};
