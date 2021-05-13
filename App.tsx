import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import React, { useReducer, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthCheck, FirebaseAppProvider } from 'reactfire';
import { Notification } from './components';
import { TabNavigation, UserManagementStack } from './navigation';
import { navigationTheme, paperTheme } from './themes';
import { auth } from './firebase';
import {
  NotificationContext,
  notificationReducer,
  initialNotificationState,
} from './context';
import { ShowNotificationPayloadType } from './context/Notification/types';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

export default function App() {
  const [state, dispatch] = useReducer(
    notificationReducer,
    initialNotificationState
  );
  const [signedIn, setSignedIn] = useState(false);

  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
  });

  const showNotification = (payload: ShowNotificationPayloadType) => {
    dispatch({ type: 'SHOW_NOTIFICATION', payload });
  };

  const hideNotification = () => {
    dispatch({ type: 'HIDE_NOTIFICATION' });
  };

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <NotificationContext.Provider
            value={{
              isNotificationVisible: state.isNotificationVisible,
              showNotification: showNotification,
              hideNotification: hideNotification,
            }}
          >
            {signedIn ? <TabNavigation /> : <UserManagementStack />}
            {/* <AuthCheck fallback={<UserManagementStack />}>
              <TabNavigation />
            </AuthCheck> */}
          </NotificationContext.Provider>
          <Notification
            isNotificationVisible={state.isNotificationVisible}
            notificationMessage={state.notificationMessage}
            notificationType={state.notificationType}
            hideNotification={hideNotification}
          />
        </NavigationContainer>
      </PaperProvider>
    </FirebaseAppProvider>
  );
}
