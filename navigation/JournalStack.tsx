import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { JournalEntries } from '../screens/journalScreens';
import { forFade } from '../screens/utils';
import { useTheme } from '@react-navigation/native';

export type JournalStackParamList = {
  JournalEntries: undefined;
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
        }}
      />
    </Stack.Navigator>
  );
};
