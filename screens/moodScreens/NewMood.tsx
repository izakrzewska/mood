import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { ErrorNotification, MoodForm } from '../../components';
import { auth, db } from '../../firebase';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { IError, MoodFormData } from '../../types';

type NewMoodScreenNavigationProp = StackNavigationProp<
  MoodStackParamList,
  'NewMood'
>;

type NewMoodScreenProps = {
  navigation: NewMoodScreenNavigationProp;
};

export const NewMood: FC<NewMoodScreenProps> = ({ navigation }) => {
  const [error, setError] = useState<IError>();
  const onSubmit = async (data: MoodFormData) => {
    const user = auth.currentUser!;

    try {
      const moodData = {
        value: Number(data.value),
        belongsTo: user.uid,
        createdAt: new Date(),
      };
      const ref = db.collection('moods');
      await ref.add(moodData);
      navigation.push('MoodsStatistics');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MoodForm onSubmit={onSubmit} />
      </View>
      <ErrorNotification error={error} />
    </>
  );
};
