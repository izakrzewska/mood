import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { AddDataImage, Loader, MainButton, MoodChart } from '../../components';
import { useNotificationContext } from '../../context';
import { getMoods, useMoodsReducer } from '../../reducers/moods/moodsReducer';
import styles from './styles';
import { MoodStatisticsScreenNavigationProp } from './types';

export const MoodsStatistics: FC = () => {
  const [state, dispatch] = useMoodsReducer();
  const { showNotification } = useNotificationContext();
  const navigation = useNavigation<MoodStatisticsScreenNavigationProp>();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getMoods(dispatch, showNotification);
    }
  }, [isFocused]);

  const onNewMoodPress = () => {
    navigation.push('NewMood');
  };

  const noMoodsContent = (
    <View style={styles.noStatisticsContainer}>
      <TouchableWithoutFeedback onPress={onNewMoodPress}>
        <AddDataImage />
      </TouchableWithoutFeedback>
      <MainButton
        mode='outlined'
        onPress={onNewMoodPress}
        text='Start tracking your mood'
        extraStyles={styles.noStatisticsButton}
      />
    </View>
  );

  const moodsContent = (
    <View style={styles.staticticsScreenContainer}>
      <MainButton
        text='History'
        mode='text'
        onPress={() => navigation.push('History')}
        extraStyles={styles.historyButton}
      />
      <View style={styles.moodChartContainer}>
        <MoodChart moods={state.moods} />
      </View>
      <View style={styles.rateMoodButtonContainer}>
        <MainButton
          mode='outlined'
          text='Rate your mood'
          onPress={onNewMoodPress}
        />
      </View>
    </View>
  );

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <View style={{ flex: 1 }}>
      {state.moods.length ? moodsContent : noMoodsContent}
    </View>
  );
};
