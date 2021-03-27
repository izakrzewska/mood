import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LoginScreen, RegisterScreen, ResetPasswordScreen } from '../screens';
import { forFade } from '../screens/utils';

export type UserManagementStackParamList = {
  Login: undefined;
  Register: undefined;
  ResetPassword: undefined;
};

const Stack = createStackNavigator<UserManagementStackParamList>();

export const UserManagementStack = () => {
  return (
    <>
      <StatusBar style='dark' />
      <Stack.Navigator
        mode='card'
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      >
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='ResetPassword' component={ResetPasswordScreen} />
      </Stack.Navigator>
    </>
  );
};
