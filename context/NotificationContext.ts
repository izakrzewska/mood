import { createContext, useContext } from 'react';

type NotificationContextType = {
  isNotificationVisible: boolean;
  showNotification: (
    message: string,
    type: 'success' | 'error' | 'info'
  ) => void;
  hideNotification: () => void;
};

export const NotificationContext = createContext<NotificationContextType | null>(
  null
);

export const useNotificationContext = () =>
  useContext<NotificationContextType | null>(
    NotificationContext
  ) as NotificationContextType;
