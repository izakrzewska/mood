import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoodForm } from '../../components';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { MoodFormData } from '../../types';
import { RouteProp } from '@react-navigation/native';
import { db } from '../../firebase';

type EditMoodScreenNavigationProp = StackNavigationProp<
  MoodStackParamList,
  'EditMoodDetails'
>;

type EditMoodScreenRouteProp = RouteProp<MoodStackParamList, 'EditMoodDetails'>;

type EditMoodScreenProps = {
  navigation: EditMoodScreenNavigationProp;
  route: EditMoodScreenRouteProp;
};

export const EditMoodDetails: FC<EditMoodScreenProps> = ({
  navigation,
  route,
}) => {
  const { value, moodId } = route.params;
  const onSubmit = async (data: MoodFormData) => {
    const ref = db.collection('moods').doc(moodId);

    try {
      await ref.set(
        {
          value: Number(data.value),
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    navigation.push('History');
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MoodForm onSubmit={onSubmit} defaultValues={{ value }} />
    </View>
  );
};
