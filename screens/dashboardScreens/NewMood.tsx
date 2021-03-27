import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC } from 'react';
import { View } from 'react-native';
import { MoodForm } from '../../components';
import { auth, db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { MoodFormData } from '../../types';

type NewMoodScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'NewMood'
>;

type NewMoodScreenProps = {
  navigation: NewMoodScreenNavigationProp;
};

export const NewMood: FC<NewMoodScreenProps> = ({ navigation }) => {
  const onSubmit = async (data: MoodFormData) => {
    const user = auth.currentUser!;
    try {
      const moodData = {
        value: Number(data.value),
        belongsTo: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const ref = db.collection('moods');
      await ref.add(moodData);
      navigation.push('MoodsStatistics');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <MoodForm onSubmit={onSubmit} />
    </View>
  );
};
