import React, { FC } from 'react';
import { View } from 'react-native';
import { useFirestore, useUser } from 'reactfire';
import { MoodForm } from '../../components';
import { useNotificationContext } from '../../context';
import { MoodFormData, NewMoodScreenNavigationProp } from './types';

type NewMoodScreenProps = {
  navigation: NewMoodScreenNavigationProp;
};

export const NewMood: FC<NewMoodScreenProps> = ({ navigation }) => {
  const { data: user } = useUser();
  const { showNotification } = useNotificationContext();

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
