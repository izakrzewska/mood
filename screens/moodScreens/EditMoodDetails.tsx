import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  ErrorNotification,
  MoodForm,
  SuccessNotification,
} from '../../components';
import { db } from '../../firebase';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { MoodFormData } from '../../types';
import { useNotifySuccess } from '../../hooks';

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
  const [error, setHasError] = useState();
  const { value, moodId } = route.params;
  const { openSuccess, isActive, message } = useNotifySuccess();

  const onSubmit = (data: MoodFormData) => {
    let mounted = true;
    const ref = db.collection('moods').doc(moodId);

    if (mounted) {
      ref
        .set(
          {
            value: Number(data.value),
          },
          { merge: true }
        )
        .then(() => {
          Keyboard.dismiss();
          openSuccess('Updated successfuly');
        })
        .catch((error) => {
          setHasError(error);
        });
    }
    return () => (mounted = false);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MoodForm onSubmit={onSubmit} defaultValues={{ value }} />
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </View>
  );
};
