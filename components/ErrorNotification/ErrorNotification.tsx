import React, { FC, useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { View } from 'react-native';
import { colors } from '../../themes';
import { getErrorText } from '../../screens/utils';

interface ErrorNotificationProps {
  error?: { code: string; message: string };
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({ error }) => {
  useEffect(() => {
    if (error !== undefined) {
      setIsSnackBarVisible(true);
    }
  }, [error]);

  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);
  const notificationText = error === undefined ? '' : getErrorText(error);

  const dismissSnackbar = () => {
    setIsSnackBarVisible(false);
  };

  return (
    <Snackbar
      onDismiss={dismissSnackbar}
      visible={isSnackBarVisible}
      wrapperStyle={{
        alignSelf: 'center',
      }}
      style={{
        marginHorizontal: 0,
      }}
      action={{
        label: 'OK',
        onPress: dismissSnackbar,
      }}
      theme={{
        colors: {
          accent: colors.white,
          onSurface: colors.error,
          surface: colors.white,
        },
      }}
    >
      {notificationText}
    </Snackbar>
  );
};
