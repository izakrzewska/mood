import React, { FC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { AddDataImage, Loader, MainButton, MoodChart } from '../../components';
import styles from './styles';
import { Mood, MoodStatisticsScreenNavigationProp } from './types';

type MoodStatisticsScreenProps = {
  navigation: MoodStatisticsScreenNavigationProp;
};

export const MoodsStatistics: FC<MoodStatisticsScreenProps> = ({
  navigation,
}) => {
  const { data: user } = useUser();
  const userMoodsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('moods');

  const { status, data: moods } = useFirestoreCollectionData<Mood>(
    userMoodsRef
  );

  const showHistory = () => {
    navigation.push('History');
  };

  const onNewMoodPress = () => {
    navigation.push('NewMood');
  };

  const greeting = <Text>{`Hello, ${user.displayName}`}</Text>;
  const noMoodsContent = (
    <View style={styles.noStatisticsContainer}>
      <View style={{ marginBottom: 50 }}>{greeting}</View>
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
        onPress={showHistory}
        extraStyles={styles.historyButton}
      />
      <View style={styles.moodChartContainer}>
        <MoodChart moods={moods} />
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

  if (status === 'loading') {
    return <Loader />;
  }

  return moods.length ? moodsContent : noMoodsContent;
};
