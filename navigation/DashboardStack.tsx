import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MoodsStatistics, History, NewMood } from '../screens/dashboardScreens';
import { forFade } from '../screens/utils';
import { useTheme } from '@react-navigation/native';

export type DashboardStackParamList = {
  MoodsStatistics: undefined;
  History: undefined;
  NewMood: undefined;
};

export const DashboardStack = () => {
  const { colors } = useTheme();
  const Stack = createStackNavigator<DashboardStackParamList>();

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
        name='MoodsStatistics'
        component={MoodsStatistics}
        options={{
          headerShown: false,
          title: 'Mood Statictics',
        }}
      />
      <Stack.Screen
        name='History'
        component={History}
        options={{
          title: 'History',
        }}
      />
      <Stack.Screen
        name='NewMood'
        component={NewMood}
        options={{
          title: 'New Mood',
        }}
      />
    </Stack.Navigator>
  );
};
