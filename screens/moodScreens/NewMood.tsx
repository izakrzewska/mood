import React, { FC } from 'react';
import { View } from 'react-native';
import { MoodForm } from '../../components';
import { useNotificationContext } from '../../context';
import { addMood, useMoodsReducer } from '../../reducers/moods/moodsReducer';
import { MoodFormData, NewMoodScreenNavigationProp } from './types';
import { useNavigation } from '@react-navigation/native';

export const NewMood: FC = () => {
  const navigation = useNavigation<NewMoodScreenNavigationProp>();
  const [_, dispatch] = useMoodsReducer();
  const { showNotification } = useNotificationContext();
  const onSubmit = (data: MoodFormData) => {
    addMood(data, dispatch, showNotification).then(() =>
      navigation.push('MoodsStatistics')
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <MoodForm onSubmit={onSubmit} />
    </View>
  );
};
