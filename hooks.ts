import { auth, db } from './firebase';
import React, { useState, useEffect } from 'react';
import { IMoodFetched } from './types';

export const useGetMoods = (isFocused: boolean, order: 'asc' | 'desc') => {
  const user = auth.currentUser!;
  const [moodsData, setMoodsData] = useState<IMoodFetched[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let isMounted = true;
    const fetchData = () => {
      setIsLoading(true);
      const ref = db
        .collection('moods')
        .where('belongsTo', '==', user.uid)
        .orderBy('createdAt', order);
      ref.onSnapshot((query) => {
        const moodsDataArray: IMoodFetched[] = [];
        query.forEach((doc) => {
          moodsDataArray.push({
            id: doc.id,
            date: doc.data().createdAt,
            value: doc.data().value,
          });
        });
        setMoodsData(moodsDataArray);
        setIsLoading(false);
      });
    };

    if (isFocused && isMounted) {
      fetchData();
    }

    return () => {
      isMounted = false;
    };
  }, [isFocused]);
  return { moodsData, isLoading };
};

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
