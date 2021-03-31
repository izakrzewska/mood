import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  JournalEntries,
  NewJournal,
  JournalDetails,
} from '../screens/journalScreens';
import { forFade } from '../screens/utils';
import { useTheme } from '@react-navigation/native';

export type JournalStackParamList = {
  JournalEntries: undefined;
  NewJournal: undefined;
  JournalDetails: {
    title: string;
    content: string;
    formattedDate: any; // TODO: better type
  };
};

export const JournalStack = () => {
  const { colors } = useTheme();
  const Stack = createStackNavigator<JournalStackParamList>();

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
        name='JournalEntries'
        component={JournalEntries}
        options={{
          title: 'All entries',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='NewJournal'
        component={NewJournal}
        options={{
          title: 'New entry',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='JournalDetails'
        component={JournalDetails}
        options={{
          title: 'Details',
        }}
      />
    </Stack.Navigator>
  );
};
