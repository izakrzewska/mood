import React, { useEffect, useState, useCallback } from 'react';
import { Text, View, Button, ScrollView } from 'react-native';
import { auth, db } from '../../firebase';
import { MoodChart, Loader, MoodsDatePicker } from '../../components';
import { useIsFocused } from '@react-navigation/native';

export const MoodsStatistics = ({ navigation }) => {
  const today = new Date(Date.now());
  const isFocused = useIsFocused();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const twoWeeksEarlier = new Date(today - 12096e5); // minus two weeks in miliseconds
  const [moodsData, setMoodsData] = useState([]);
  const [startDate, setStartDate] = useState(twoWeeksEarlier);
  const [endDate, setEndDate] = useState(today);
  const user = auth.currentUser;

  const onStartDateSelected = (event, selectedDate) => {
    setStartDate(selectedDate);
  };

  const onEndDateSelected = (event, selectedDate) => {
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
        const moodsDataArray = [];
        query.forEach((doc) => {
          const date =
            doc.data() && doc.data().createdAt && doc.data().createdAt.toDate();
          moodsDataArray.push({
            id: doc.id,
            date,
            ...doc.data(),
          });
        });
        setMoodsData(moodsDataArray);
        setIsDataLoaded(true);
      });
    }
  }, [startDate, endDate, isFocused]);

  const showHistory = () => {
    navigation.push('history');
  };

  const onNoMoodsPress = () => {
    navigation.navigate('newMood');
  };

  const noMoodsContent = (
    <View>
      <Text>No moods</Text>
      <Button title='Add your first mood' onPress={onNoMoodsPress} />
    </View>
  );

  const onNewMoodPress = () => {
    navigation.push('newMood');
  };

  const moodsContent = (
    <View>
      <Button title='history' onPress={showHistory} />
      <Button title='add mood' onPress={onNewMoodPress} />
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
    <View>
      <Text>moods dashboard</Text>
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
