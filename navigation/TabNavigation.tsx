import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { NavigatorScreenParams, useTheme } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { JournalStack, JournalStackParamList } from './JournalStack';
import { MoodStack, MoodStackParamList } from './MoodStack';
import { SettingsStack, SettingsStackParamList } from './SettingsStack';
import { JournalsProvider } from '../contexts/journals/journalsContext';

type TabParamList = {
  Mood: NavigatorScreenParams<MoodStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  Journal: NavigatorScreenParams<JournalStackParamList>;
};

const Tab = createMaterialBottomTabNavigator<TabParamList>();

export const TabNavigation = () => {
  const { colors } = useTheme();
  return (
    <JournalsProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
        <Tab.Navigator
          initialRouteName='Mood'
          shifting
          activeColor={colors.text}
          inactiveColor={colors.text}
        >
          <Tab.Screen
            name='Mood'
            component={MoodStack}
            options={{
              title: 'mood',
              tabBarIcon: 'chart-bar',
            }}
          />
          <Tab.Screen
            name='Journal'
            component={JournalStack}
            options={{
              title: 'journal',
              tabBarIcon: 'book-open-page-variant',
            }}
          />
          <Tab.Screen
            name='Settings'
            component={SettingsStack}
            options={{
              title: 'settings',
              tabBarIcon: 'account-cog',
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </JournalsProvider>
  );
};
