import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { MoodForm } from '../../components';
import { db } from '../../firebase';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { MoodFormData } from '../../types';

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
  const onSubmit = (data: MoodFormData) => {
    const ref = db.collection('moods').doc(moodId);
    ref
      .set(
        {
          value: Number(data.value),
        },
        { merge: true }
      )
      .then(() => {
        //TODO: success notification
      })
      .catch((error) => {
        // TODO: error notification
      })
      .finally(() => {
        navigation.navigate('History');
      });
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
