import React, { useState } from 'react';
import { auth } from './firebase';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { paperTheme, navigationTheme } from './themes';
import { TabNavigation, UserManagementStackNavigation } from './navigation';

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
        {signedIn ? <TabNavigation /> : <UserManagementStackNavigation />}
      </NavigationContainer>
    </PaperProvider>
  );
}
