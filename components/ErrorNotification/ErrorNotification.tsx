import React, { FC, useEffect, useState } from 'react';
import { Snackbar } from 'react-native-paper';
import { IError } from '../../types';
import { colors } from '../../themes';
import { getErrorText } from '../../screens/utils';

interface ErrorNotificationProps {
  error?: IError;
  extraStyles?: any;
}

export const ErrorNotification: FC<ErrorNotificationProps> = ({
  error,
  extraStyles,
}) => {
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
        ...extraStyles,
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
