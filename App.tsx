import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { auth } from './firebase';
import { TabNavigation, UserManagementStack } from './navigation';
import { navigationTheme, paperTheme } from './themes';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';
import { FirebaseAppProvider } from 'reactfire';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

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
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          {signedIn ? <TabNavigation /> : <UserManagementStack />}
        </NavigationContainer>
      </PaperProvider>
    </FirebaseAppProvider>
  );
}
