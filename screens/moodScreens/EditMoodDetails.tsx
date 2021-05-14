import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Loader, MoodForm } from '../../components';
import { useNotificationContext } from '../../context';
import { editMood, useMoodsReducer } from '../../reducers/moods/moodsReducer';
import {
  EditMoodScreenNavigationProp,
  EditMoodScreenRouteProp,
  MoodFormData,
} from './types';

export const EditMoodDetails: FC = () => {
  const {
    params: { id, value },
  } = useRoute<EditMoodScreenRouteProp>();
  const navigation = useNavigation<EditMoodScreenNavigationProp>();
  const [state, dispatch] = useMoodsReducer();
  const { showNotification } = useNotificationContext();

  const onSubmit = (data: MoodFormData) => {
    editMood(id, data, dispatch, showNotification).then(() =>
      navigation.push('History')
    );
  };

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <MoodForm onSubmit={onSubmit} defaultValues={{ value: value }} />
    </View>
  );
};
