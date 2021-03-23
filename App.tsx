import React, { useState } from 'react';
import { auth } from './firebase';
import {
  Provider as PaperProvider,
  DefaultTheme as PaperDefaultTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { TabNavigation, UserManagementStackNavigation } from './navigation';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);

  const paperTheme = {
    ...PaperDefaultTheme,
    roundness: 2,
    colors: {
      ...PaperDefaultTheme.colors,
      primary: '#A37774',
    },
  };

  const navigationTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      primary: '#A37774',
      border: '#A37774',
      text: '#fff',
      background: '#fff',
    },
  };

  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  return (
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        {signedIn ? <TabNavigation /> : <UserManagementStackNavigation />}
      </NavigationContainer>
    </PaperProvider>
  );
}
