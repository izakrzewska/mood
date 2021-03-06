import { useTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import {
  JournalEdit,
  JournalEntries,
  NewJournal,
} from '../screens/journalScreens';
import { forFade } from '../screens/utils';

export type JournalStackParamList = {
  JournalEntries: undefined;
  NewJournal: undefined;
  JournalEdit: {
    id: string;
    title: string;
    content: string;
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
        }}
      />
      <Stack.Screen
        name='JournalEdit'
        component={JournalEdit}
        options={{
          title: 'Edit',
        }}
      />
    </Stack.Navigator>
  );
};
