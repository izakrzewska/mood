import {
  API_KEY,
  APP_ID,
  AUTH_DOMAIN,
  MESSAGING_SENDER_ID,
  PROJECT_ID,
  STORAGE_BUCKET,
} from '@env';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { AuthCheck, FirebaseAppProvider } from 'reactfire';
import { Notification } from './components';
import { TabNavigation, UserManagementStack } from './navigation';
import { navigationTheme, paperTheme } from './themes';
import { NotificationContext } from './context';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

export default function App() {
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationType, setNotificationType] = useState<
    'info' | 'success' | 'error'
  >('info');

  const showNotification = (
    message: string,
    type: 'success' | 'error' | 'info' = 'info'
  ) => {
    setIsNotificationVisible(true);
    setNotificationMessage(message);
    setNotificationType(type);
  };

  const hideNotification = () => {
    setIsNotificationVisible(false);
    setNotificationType('info');
    setNotificationMessage('');
  };

  return (
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <NotificationContext.Provider
            value={{
              isNotificationVisible: isNotificationVisible,
              showNotification: showNotification,
              hideNotification: hideNotification,
            }}
          >
            <AuthCheck fallback={<UserManagementStack />}>
              <TabNavigation />
            </AuthCheck>
          </NotificationContext.Provider>
          <Notification
            isNotificationVisible={isNotificationVisible}
            notificationMessage={notificationMessage}
            notificationType={notificationType}
            hideNotification={hideNotification}
          />
        </NavigationContainer>
      </PaperProvider>
    </FirebaseAppProvider>
  );
}
