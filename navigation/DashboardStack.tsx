import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  MoodsStatistics,
  History,
  NewMood,
  MoodDetails,
  EditMoodDetails,
} from '../screens/dashboardScreens';
import { forFade } from '../screens/utils';
import { useTheme } from '@react-navigation/native';

export type DashboardStackParamList = {
  MoodsStatistics: undefined;
  History: undefined;
  NewMood: undefined;
  MoodDetails: { moodId: string };
  EditMoodDetails: { moodId: string; value: number; note: string };
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
        name='MoodDetails'
        component={MoodDetails}
        options={{
          title: 'Mood Details',
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
