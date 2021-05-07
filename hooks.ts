import React from 'react';

export const useNotifySuccess = () => {
  const [isActive, setIsActive] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    if (isActive === true) {
      setTimeout(() => {
        setIsActive(false);
      }, 3000);
    }
  }, [isActive]);

  const openSuccess = (text = 'Success') => {
    setMessage(text);
    setIsActive(true);
  };

  return { isActive, message, openSuccess };
};

export const useFormatDate = (date: any) => {
  // TODO: change type to timestamp
  const formattedTime = date.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = date.toDate().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedWeekday = date.toDate().toLocaleDateString(undefined, {
    weekday: 'long',
  });
  return { formattedDate, formattedTime, formattedWeekday };
};
