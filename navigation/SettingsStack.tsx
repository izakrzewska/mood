import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  MainSettings,
  AppSettings,
  UserSettings,
} from '../screens/settingsScreens';
import { forFade } from '../screens/utils';

export type SettingsStackParamList = {
  MainSettings: undefined;
  AppSettings: undefined;
  UserSettings: undefined;
};

export const SettingsStack = () => {
  const { colors } = useTheme();
  const Stack = createStackNavigator<SettingsStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.text,
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { marginLeft: 5 },
        cardStyleInterpolator: forFade,
      }}
    >
      <Stack.Screen
        name='MainSettings'
        component={MainSettings}
        options={{
          title: 'Main Settings',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='UserSettings'
        component={UserSettings}
        options={{
          title: 'User Settings',
        }}
      />
      <Stack.Screen
        name='AppSettings'
        component={AppSettings}
        options={{
          title: 'App Settings',
        }}
      />
    </Stack.Navigator>
  );
};
