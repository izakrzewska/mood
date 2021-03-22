import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { SafeAreaView } from 'react-native';
import { SettingsTab } from '../screens';
import { DashboardStack } from './DashboardStack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { DashboardStackParamList } from './DashboardStack';

type TabParamList = {
  Dashboard: NavigatorScreenParams<DashboardStackParamList>;
  Settings: undefined; // TODO: change when settings stack is done
};

const Tab = createBottomTabNavigator<TabParamList>();

export const TabNavigation = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#29434e' }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            if (route.name === 'Settings') {
              return <FontAwesome name='cogs' size={size} color={color} />;
            }
            if (route.name === 'Dashboard') {
              return <FontAwesome name='dashboard' size={size} color={color} />;
            }
          },
        })}
        tabBarOptions={{
          activeTintColor: 'white',
          inactiveTintColor: '#819ca9',
          style: {
            backgroundColor: '#29434e',
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
          name='Settings'
          component={SettingsTab}
          options={{
            title: 'Settings',
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};
