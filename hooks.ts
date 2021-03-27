import { auth, db } from './firebase';
import React, { useState, useEffect } from 'react';
import { IMoodFetched } from './types';

export const useGetMoods = (isFocused: boolean) => {
  const user = auth.currentUser!;
  const [moodsData, setMoodsData] = useState<IMoodFetched[]>();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      const ref = db
        .collection('moods')
        .where('belongsTo', '==', user.uid)
        .orderBy('createdAt', 'asc');
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

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);
  return { moodsData, isLoading };
};
