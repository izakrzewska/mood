import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { auth } from './firebase';
import { TabNavigation, UserManagementStack } from './navigation';
import { navigationTheme, paperTheme } from './themes';

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
    <PaperProvider theme={paperTheme}>
      <NavigationContainer theme={navigationTheme}>
        {signedIn ? <TabNavigation /> : <UserManagementStack />}
      </NavigationContainer>
    </PaperProvider>
  );
}
