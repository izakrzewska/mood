import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import { forFade } from './screens/utils';

import { auth } from './firebase';
import {
  LoginScreen,
  RegisterScreen,
  DashboardTab,
  SettingsTab,
  ResetPasswordScreen,
} from './screens';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#29434e' }}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ color, size }) => {
                if (route.name === 'moods') {
                  return (
                    <FontAwesome name='list-ul' size={size} color={color} />
                  );
                }
                if (route.name === 'settings') {
                  return <FontAwesome name='cogs' size={size} color={color} />;
                }
                if (route.name === 'dashboard') {
                  return (
                    <FontAwesome name='dashboard' size={size} color={color} />
                  );
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
              name='dashboard'
              component={DashboardTab}
              options={{
                title: 'Dashboard',
              }}
            />
            <Tab.Screen
              name='settings'
              component={SettingsTab}
              options={{
                title: 'Settings',
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      ) : (
        <>
          <StatusBar style='light' />
          <Stack.Navigator
            mode='card'
            screenOptions={{
              headerShown: false,
              cardStyleInterpolator: forFade,
            }}
          >
            <Stack.Screen name='signIn' component={LoginScreen} />
            <Stack.Screen name='register' component={RegisterScreen} />
            <Stack.Screen
              name='resetPassword'
              component={ResetPasswordScreen}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
