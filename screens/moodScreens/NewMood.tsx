import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import { MoodForm } from '../../components';
import { MoodFormData, NewMoodScreenNavigationProp } from './types';
import { useUser, useFirestore } from 'reactfire';
import { NotificationContext, NotificationContextType } from '../../context';

type NewMoodScreenProps = {
  navigation: NewMoodScreenNavigationProp;
};

export const NewMood: FC<NewMoodScreenProps> = ({ navigation }) => {
  const { data: user } = useUser();
  const { showNotification } = useContext(
    NotificationContext
  ) as NotificationContextType;

  const userMoodsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('moods');

  const addMood = async (data: MoodFormData) => {
    try {
      const moodData = {
        value: Number(data.value),
        createdAt: new Date(),
      };
      await userMoodsRef.add(moodData);
      navigation.navigate('MoodsStatistics');
    } catch ({ message }) {
      showNotification(message, 'error');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MoodForm onSubmit={addMood} />
    </View>
  );
};
