import React, { FC } from 'react';
import { Keyboard, View } from 'react-native';
import { useAuth } from 'reactfire';
import { AuthNavigationBox, LoginImage, RegisterForm } from '../../components';
import styles from './styles';
import { RegisterFormData, RegisterScreenNavigationProp } from './types';

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

export const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
  const auth = useAuth();
  const onSubmit = async (data: RegisterFormData) => {
    Keyboard.dismiss();
    const { email, password } = data;
    try {
      await auth
        .createUserWithEmailAndPassword(email.trim().toLowerCase(), password)
        .then((response) => {
          const user = response.user;
          user
            ?.updateProfile({ displayName: data.username })
            .catch((error) => console.log('error'));
        });
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <View style={styles.authFormContainer}>
      <RegisterForm onSubmit={onSubmit} />
      <View style={styles.imageContainer}>
        <LoginImage />
      </View>
      <AuthNavigationBox
        questionText='Do you already have an account?'
        buttonText='Sign in'
        onButtonPress={() => navigation.navigate('Login')}
      />
    </View>
  );
};
