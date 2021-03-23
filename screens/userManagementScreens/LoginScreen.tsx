import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { LoginImage, MainButton, FormError } from '../../components';
import { auth } from '../../firebase';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';
import styles from './styles';
import { useIsFocused } from '@react-navigation/native';

type LoginScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'Login'
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

type LoginFormData = {
  email: string;
  password: string;
};

export const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
  const isFocused = useIsFocused();
  const { control, handleSubmit, trigger, errors, reset } = useForm<
    LoginFormData
  >({
    reValidateMode: 'onBlur',
  });

  const onSubmit = (data: LoginFormData) => {
    const { email, password } = data;
    auth
      .signInWithEmailAndPassword(email.trim().toLowerCase(), password)
      .then((response) => console.log(response)) // TODO: notification
      .catch((error) => console.log(error)); // TODO: notification
  };

  return (
    <View style={styles.authFormContainer}>
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
      <View style={styles.imageContainer}>
        <LoginImage />
      </View>
      <View style={styles.switchScreenText}>
        <Text>Forgot password?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => {
          navigation.navigate('ResetPassword');
        }}
        text='Reset password'
      />
      <View style={styles.switchScreenText}>
        <Text>Don't have an account yet?</Text>
      </View>
      <MainButton
        mode='outlined'
        onPress={() => navigation.navigate('Register')}
        text='Register account'
      />
    </View>
  );
};
