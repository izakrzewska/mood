import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { AddDataImage, Loader, MainButton, MoodChart } from '../../components';
import { auth, db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { IMoodFetchedStatistics } from '../../types';

const styles = StyleSheet.create({
  staticticsScreenContainer: {
    flex: 1,
    marginBottom: 20,
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
    marginTop: 20,
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
  DashboardStackParamList,
  'MoodsStatistics'
>;

type MoodStatisticsScreenProps = {
  navigation: MoodStatisticsScreenNavigationProp;
};

export const MoodsStatistics: FC<MoodStatisticsScreenProps> = ({
  navigation,
}) => {
  const isFocused = useIsFocused();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [moodsData, setMoodsData] = useState<IMoodFetchedStatistics[]>([]);
  const user = auth.currentUser!;

  useEffect(() => {
    if (isFocused) {
      const ref = db
        .collection('moods')
        .where('belongsTo', '==', user.uid)
        .orderBy('createdAt', 'asc');
      ref.onSnapshot((query) => {
        const moodsDataArray: IMoodFetchedStatistics[] = [];
        query.forEach((doc) => {
          const date =
            doc.data() &&
            doc.data().createdAt &&
            doc.data().createdAt.toDate().setHours(0, 0, 0, 0);
          moodsDataArray.push({
            id: doc.id,
            date,
            value: doc.data().value,
          });
        });
        setMoodsData(moodsDataArray);
        setIsDataLoaded(true);
      });
    }
  }, [isFocused]);

  const showHistory = () => {
    navigation.push('History');
  };

  const onNewMoodPress = () => {
    navigation.push('NewMood');
  };

  const noMoodsContent = (
    <View style={styles.noStatisticsContainer}>
      <AddDataImage />
      <MainButton
        mode='contained'
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
        {/* <IconButton
          animated
          size={52}
          color={colors.main}
          icon='plus'
          style={{ alignSelf: 'center' }}
        /> */}
        <MainButton
          mode='text'
          text='Rate your today mood'
          onPress={onNewMoodPress}
        />
      </View>
    </View>
  );

  return !isDataLoaded ? (
    <Loader />
  ) : moodsData.length > 0 ? (
    moodsContent
  ) : (
    noMoodsContent
  );
};
