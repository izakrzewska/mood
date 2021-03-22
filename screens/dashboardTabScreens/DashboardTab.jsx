import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { MoodsStatistics } from './MoodsStatistics';
import { History } from './History';
import { NewMood } from './NewMood';
import { forFade } from '../utils';

export const DashboardTab = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='moodsStatistics'
        component={MoodsStatistics}
        options={{
          headerShown: false,
          title: 'Mood Statictics',
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name='history'
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
        name='newMood'
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
