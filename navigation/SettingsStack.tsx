import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Profile } from '../screens/settingsScreens';
import { forFade } from '../screens/utils';

export type SettingsdStackParamList = {
  Profile: undefined;
};

export const SettingsStack = () => {
  const { colors } = useTheme();
  const Stack = createStackNavigator<SettingsdStackParamList>();

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
        name='Profile'
        component={Profile}
        options={{
          title: 'Profile',
        }}
      />
    </Stack.Navigator>
  );
};
