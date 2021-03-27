import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SettingsStack, SettingsStackParamList } from './SettingsStack';
import { DashboardStack, DashboardStackParamList } from './DashboardStack';
import { JournalStack, JournalStackParamList } from './JournalStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { useTheme } from '@react-navigation/native';

type TabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
  Journal: NavigatorScreenParams<JournalStackParamList>;
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigation = () => {
  const { colors } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Settings') {
              return <FontAwesome name='cogs' size={size} color={color} />;
            }
            if (route.name === 'Dashboard') {
              return <FontAwesome name='dashboard' size={size} color={color} />;
            }
            if (route.name === 'Journal') {
              return <FontAwesome name='book' size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: colors.text,
          inactiveTintColor: colors.text,
          style: {
            backgroundColor: colors.primary,
          },
        }}
      >
        <Tab.Screen
          name='Dashboard'
          component={DashboardStack}
          options={{
            title: 'Dashboard',
          }}
        />
        <Tab.Screen
          name='Journal'
          component={JournalStack}
          options={{
            title: 'Journal',
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsStack}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
