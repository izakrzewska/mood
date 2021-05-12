import { createContext } from 'react';

export type NotificationContextType = {
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
