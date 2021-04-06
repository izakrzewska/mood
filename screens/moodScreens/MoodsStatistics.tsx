import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { Text } from 'react-native-paper';
import { AddDataImage, Loader, MainButton, MoodChart } from '../../components';
import { auth } from '../../firebase';
import { useGetMoods } from '../../hooks';
import { MoodStackParamList } from '../../navigation/MoodStack';

const styles = StyleSheet.create({
  staticticsScreenContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  noStatisticsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noStatisticsButton: {
    marginTop: 50,
  },
  historyButton: {
    alignSelf: 'flex-end',
  },
  moodChartContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rateMoodButtonContainer: {
    marginTop: 'auto',
    marginHorizontal: 30,
    marginBottom: 15,
  },
});

type MoodStatisticsScreenNavigationProp = StackNavigationProp<
  MoodStackParamList,
  'MoodsStatistics'
>;

type MoodStatisticsScreenProps = {
  navigation: MoodStatisticsScreenNavigationProp;
};

export const MoodsStatistics: FC<MoodStatisticsScreenProps> = ({
  navigation,
}) => {
  const isFocused = useIsFocused();
  const user = auth.currentUser!;
  const { moodsData, isLoading } = useGetMoods(isFocused, 'asc');

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
        <MoodChart moods={moodsData} />
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

  return isLoading ? (
    <Loader />
  ) : moodsData && moodsData?.length > 0 ? (
    moodsContent
  ) : (
    noMoodsContent
  );
};
