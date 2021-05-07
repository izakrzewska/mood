import React, { FC } from 'react';
import { View } from 'react-native';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { Loader, MoodForm } from '../../components';
import {
  EditMoodScreenNavigationProp,
  EditMoodScreenRouteProp,
  Mood,
  MoodFormData,
} from './types';

type EditMoodScreenProps = {
  navigation: EditMoodScreenNavigationProp;
  route: EditMoodScreenRouteProp;
};

export const EditMoodDetails: FC<EditMoodScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  const { data: user } = useUser();

  const editedMoodRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('moods')
    .doc(id);

  const { status, data: mood } = useFirestoreDocData<Mood>(editedMoodRef);

  const editMood = async (data: MoodFormData) => {
    try {
      await editedMoodRef.set(
        {
          value: Number(data.value),
        },
        { merge: true }
      );
      navigation.navigate('History');
    } catch (error) {
      console.log('error');
    }
  };

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MoodForm onSubmit={editMood} defaultValues={{ value: mood.value }} />
    </View>
  );
};
