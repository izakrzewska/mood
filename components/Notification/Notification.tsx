import React, { FC } from 'react';
import { Snackbar } from 'react-native-paper';
import { NotificationType } from '../../context/Notification/types';
import { colors } from '../../themes';

interface NotificationProps {
  isNotificationVisible: boolean;
  notificationType?: NotificationType;
  notificationMessage?: string;
  hideNotification: () => void;
}

export const Notification: FC<NotificationProps> = ({
  isNotificationVisible,
  notificationType,
  notificationMessage,
  hideNotification,
}) => {
  const dismissSnackbar = () => {
    hideNotification();
  };

  const getColors = () => {
    switch (notificationType) {
      case 'error': {
        return colors.error;
      }
      case 'success': {
        return colors.success;
      }
      default: {
        return colors.grey;
      }
    }
  };

  return (
    <Snackbar
      onDismiss={dismissSnackbar}
      visible={isNotificationVisible}
      wrapperStyle={{
        alignSelf: 'center',
      }}
      style={{
        marginHorizontal: 20,
        marginBottom: 20,
      }}
      action={{
        label: 'OK',
        onPress: dismissSnackbar,
      }}
      theme={{
        colors: {
          accent: colors.white,
          onSurface: getColors(),
          surface: colors.white,
        },
      }}
    >
      {notificationMessage}
    </Snackbar>
  );
};
