import React, { FC, useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { colors } from '../../themes';

interface SuccessNotificationProps {
  success?: boolean;
  extraStyles?: any;
  notificationText: string;
}

export const SuccessNotification: FC<SuccessNotificationProps> = ({
  success,
  extraStyles,
  notificationText,
}) => {
  useEffect(() => {
    if (success) {
      setIsSnackBarVisible(true);
    }
  }, [success]);

  const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

  const dismissSnackbar = () => {
    setIsSnackBarVisible(false);
  };

  return (
    <Snackbar
      onDismiss={dismissSnackbar}
      visible={isSnackBarVisible}
      duration={3000}
      wrapperStyle={{
        alignSelf: 'center',
        ...extraStyles,
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
          onSurface: colors.success,
          surface: colors.white,
        },
      }}
    >
      {notificationText}
    </Snackbar>
  );
};
