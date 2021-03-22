import React, { FC, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import styles from './styles';
import { auth } from '../../firebase';

import { StackNavigationProp } from '@react-navigation/stack';
import { UserManagementStackParamList } from '../../navigation/UserManagementStackNavigation';

type ResetPasswordScreenNavigationProp = StackNavigationProp<
  UserManagementStackParamList,
  'ResetPassword'
>;

type RegisterScreenProps = {
  navigation: ResetPasswordScreenNavigationProp;
};

type ResetPasswordFormData = {
  email: string;
};

export const ResetPasswordScreen: FC<RegisterScreenProps> = ({
  navigation,
}) => {
  const { control, handleSubmit, errors, watch, register } = useForm<
    ResetPasswordFormData
  >();
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      const { email } = data;
      await auth.sendPasswordResetEmail(email.trim().toLowerCase());
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            label='Email'
            mode='outlined'
            style={styles.formInput}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
          />
        )}
        name='email'
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errorMsg}>
        {errors.email && <Text>You must enter your email</Text>}
      </View>
      <View>
        <Button
          style={styles.submitButton}
          mode='contained'
          compact={false}
          onPress={handleSubmit(onSubmit)}
          icon='key'
        >
          Reset password
        </Button>
      </View>
      <View style={styles.switchScreenText}>
        <Text>Go back to login Screen</Text>
      </View>
      <Button
        mode='outlined'
        style={styles.switchBtn}
        icon='account-arrow-right'
        compact
        onPress={() => navigation.goBack()}
      >
        Log in
      </Button>
    </View>
  );
};
