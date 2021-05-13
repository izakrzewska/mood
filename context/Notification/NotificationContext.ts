import { createContext, useContext } from 'react';
import {
  NotificationStateType,
  NotificationContextType,
  NotificationActionType,
} from './types';

export const initialNotificationState: NotificationStateType = {
  isNotificationVisible: false,
  notificationMessage: undefined,
  notificationType: undefined,
};

export const notificationReducer = (
  state: NotificationStateType,
  action: NotificationActionType
) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return {
        ...state,
        isNotificationVisible: true,
        notificationMessage: action.payload.message,
        notificationType: action.payload.type,
      };
    case 'HIDE_NOTIFICATION':
      return {
        ...state,
        isNotificationVisible: false,
        notificationMessage: undefined,
        notificationType: undefined,
      };
    default:
      return {
        ...state,
      };
  }
};

export const NotificationContext = createContext<NotificationContextType | null>(
  null
);

export const useNotificationContext = () =>
  useContext<NotificationContextType | null>(
    NotificationContext
  ) as NotificationContextType;
