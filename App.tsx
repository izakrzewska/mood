import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthCheck, FirebaseAppProvider } from 'reactfire';
import { TabNavigation, UserManagementStack } from './navigation';
import { navigationTheme, paperTheme } from './themes';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

export default function App() {
  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <AuthCheck fallback={<UserManagementStack />}>
            <TabNavigation />
          </AuthCheck>
        </NavigationContainer>
      </PaperProvider>
    </FirebaseAppProvider>
  );
}
