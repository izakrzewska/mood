import React, { useRef, useState } from 'react';
import { View, Text } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { TextInput, Button } from 'react-native-paper';
import styles from './styles';
import { auth } from '../../firebase';

export const ResetPasswordScreen = ({ navigation }) => {
  const { control, handleSubmit, errors, watch, register } = useForm();
  const [error, setError] = useState({ code: '', text: '' });
  const password = useRef({});
  password.current = watch('password', '');

  const onSubmit = async (data) => {
    setError();
    try {
      const { email } = data;
      await auth.sendPasswordResetEmail(email.trim().toLowerCase());
      navigation.goBack();
    } catch (error) {
      setError(error);
    }
  };

  const getErrorText = (error) => {
    let errorText;
    switch (error.code) {
      case 'auth/user-not-found': {
        errorText = 'Email not found in database';
        break;
      }
      default: {
        errorText = error.message;
      }
    }
    return errorText;
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
      {error && (
        <View style={styles.errorMsg}>
          <Text>{getErrorText(error)}</Text>
        </View>
      )}
      {/* <Controller
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
        rules={{ required: true }}
        defaultValue=''
      />
      <View style={styles.errorMsg}>
        {errors.password && <Text>You must enter your password</Text>}
      </View>
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
          required: true,
          validate: (value) =>
            value === password.current || 'The passwords does not match',
        }}
        defaultValue=''
      />
      <View style={styles.errorMsg}>
        {errors.passwordConf && <Text>{errors.passwordConf.message}</Text>}
      </View> */}
      <View style={styles.button}>
        <Button
          style={styles.submitButton}
          mode='contained'
          compact={false}
          onPress={handleSubmit(onSubmit)}
          contentStyle={styles.button}
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
