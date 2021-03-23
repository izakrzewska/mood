import React, { useEffect, useState, FC, ChangeEvent } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { auth, db } from '../../firebase';
import {
  MoodChart,
  Loader,
  MoodsDatePicker,
  AddDataImage,
  MainButton,
} from '../../components';
import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { MoodFetched } from '../../types';
import styles from './styles';

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
  const today = new Date(Date.now());
  const isFocused = useIsFocused();
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const twoWeeksEarlier = new Date(today.getTime() - 12096e5); // minus two weeks in miliseconds
  const [moodsData, setMoodsData] = useState<MoodFetched[]>([]);
  const [startDate, setStartDate] = useState<Date>(twoWeeksEarlier);
  const [endDate, setEndDate] = useState<Date>(today);
  const user = auth.currentUser!;

  const onStartDateSelected = (event: ChangeEvent, selectedDate: Date) => {
    setStartDate(selectedDate);
  };

  const onEndDateSelected = (event: ChangeEvent, selectedDate: Date) => {
    setEndDate(selectedDate);
  };

  useEffect(() => {
    if (isFocused) {
      const ref = db
        .collection('moods')
        .where('belongsTo', '==', user.uid)
        .where('createdAt', '>=', startDate)
        .where('createdAt', '<=', endDate)
        .orderBy('createdAt', 'asc');
      ref.onSnapshot((query) => {
        const moodsDataArray: MoodFetched[] = [];
        query.forEach((doc) => {
          const date =
            doc.data() && doc.data().createdAt && doc.data().createdAt.toDate();
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
  }, [startDate, endDate, isFocused]);

  const showHistory = () => {
    navigation.push('History');
  };

  const onNoMoodsPress = () => {
    navigation.navigate('NewMood');
  };

  const noMoodsContent = (
    <View>
      <AddDataImage />
      <MainButton
        mode='contained'
        onPress={onNoMoodsPress}
        text='Start tracking your mood'
      />
    </View>
  );

  const onNewMoodPress = () => {
    navigation.push('NewMood');
  };

  const moodsContent = (
    <View>
      <MainButton text='History' mode='text' onPress={showHistory} />
      <MainButton
        mode='contained'
        text='Rate your today mood'
        onPress={onNewMoodPress}
      />
      <ScrollView>
        <Text>Current times shown:</Text>
        <MoodsDatePicker
          date={startDate}
          onChange={onStartDateSelected}
          maximumDate={endDate < today ? endDate : today}
        />
        <MoodsDatePicker
          date={endDate}
          onChange={onEndDateSelected}
          maximumDate={today}
          minimumDate={startDate}
        />
        <Text>your moods {moodsData.length}</Text>
        <MoodChart moods={moodsData} />
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.staticticsScreenContainer}>
      {!isDataLoaded ? (
        <Loader />
      ) : moodsData.length > 0 ? (
        moodsContent
      ) : (
        noMoodsContent
      )}
    </View>
  );
};
