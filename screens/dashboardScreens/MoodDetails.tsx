import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { MainButton } from '../../components';
import { db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { IMoodDetails, MoodFormData } from '../../types';

type MoodDetailsScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'MoodDetails'
>;

type MoodDetailsScreenRouteProp = RouteProp<
  DashboardStackParamList,
  'MoodDetails'
>;

type MoodDetailsScreenProps = {
  navigation: MoodDetailsScreenNavigationProp;
  route: MoodDetailsScreenRouteProp;
};

export const MoodDetails: FC<MoodDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const [moodData, setMoodData] = useState<IMoodDetails>();
  const { moodId } = route.params;

  useEffect(() => {
    const ref = db.collection('moods').doc(moodId);
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          setMoodData({
            value: doc.data().value,
            date: doc.data().date,
            note: doc.data().note,
          });
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>{moodData?.value}</Text>
      <Text>{moodData?.note}</Text>
      <MainButton
        mode='text'
        text='Edit'
        onPress={() =>
          navigation.replace('EditMoodDetails', {
            value: moodData?.value,
            note: moodData?.note,
            moodId: moodId,
          })
        }
      />
    </View>
  );
};
