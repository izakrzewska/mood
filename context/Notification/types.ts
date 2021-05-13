export type NotificationStateType = {
  isNotificationVisible: boolean;
  notificationMessage?: string;
  notificationType?: NotificationType;
};

export type NotificationType = 'info' | 'success' | 'error';
export type ShowNotificationPayloadType = {
  message: string;
  type: NotificationType;
};

export type NotificationActionType =
  | {
      type: 'SHOW_NOTIFICATION';
      payload: ShowNotificationPayloadType;
    }
  | {
      type: 'HIDE_NOTIFICATION';
    };

export type NotificationContextType = {
  isNotificationVisible: boolean;
  showNotification: (payload: ShowNotificationPayloadType) => void;
  hideNotification: () => void;
};
