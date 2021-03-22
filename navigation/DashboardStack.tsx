import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MoodsStatistics, History, NewMood } from '../screens/dashboardScreens';
import { forFade } from '../screens/utils';

export type DashboardStackParamList = {
  MoodsStatistics: undefined;
  History: undefined;
  NewMood: undefined;
};

export const DashboardStack = () => {
  const Stack = createStackNavigator<DashboardStackParamList>();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='MoodsStatistics'
        component={MoodsStatistics}
        options={{
          headerShown: false,
          title: 'Mood Statictics',
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name='History'
        component={History}
        options={{
          title: 'History',
          headerStyle: {
            backgroundColor: '#29434e',
            borderBottomColor: '#29434e',
          },
          headerTintColor: '#fff',
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name='NewMood'
        component={NewMood}
        options={{
          title: 'New Mood',
          headerStyle: {
            backgroundColor: '#29434e',
            borderBottomColor: '#29434e',
          },
          headerTintColor: '#fff',
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
};
