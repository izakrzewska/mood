import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  MoodsStatistics,
  History,
  NewMood,
  EditMoodDetails,
} from '../screens/moodScreens';
import { forFade } from '../screens/utils';
import { useTheme } from '@react-navigation/native';
import { IMoodFetched } from '../types';

export type MoodStackParamList = {
  MoodsStatistics: undefined;
  History: undefined;
  NewMood: undefined;
  EditMoodDetails: { id: string };
};

export const MoodStack = () => {
  const { colors } = useTheme();
  const Stack = createStackNavigator<MoodStackParamList>();

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
        name='EditMoodDetails'
        component={EditMoodDetails}
        options={{
          title: 'Edit mood',
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
