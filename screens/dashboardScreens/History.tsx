import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { MoodCard, NoDataImage } from '../../components';
import { auth, db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { MoodFetched } from '../../types';

type HistoryScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'History'
>;

type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
};

const styles = StyleSheet.create({
  historyScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  noHistoryContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noHistoryText: {
    marginBottom: 30,
  },
});

export default styles;

export const History: FC<HistoryScreenProps> = ({ navigation }) => {
  const [historyData, setHistoryData] = useState<MoodFetched[]>([]);
  const user = auth.currentUser!;

  useEffect(() => {
    const ref = db
      .collection('moods')
      .where('belongsTo', '==', user.uid)
      .orderBy('createdAt', 'desc');
    ref.onSnapshot((query) => {
      const historyDataArray: MoodFetched[] = [];
      query.forEach((doc) => {
        const date =
          doc.data() && doc.data().createdAt && doc.data().createdAt.toDate();
        historyDataArray.push({
          id: doc.id,
          date,
          value: doc.data().value,
        });
      });
      setHistoryData(historyDataArray);
    });
  }, []);

  const onMoodDelete = async (mood: MoodFetched) => {
    const ref = db.collection('moods').doc(mood.id);
    try {
      await ref.delete();
    } catch (err) {
      console.error(err);
    }
  };

  const renderItem = ({ item }: any) => (
    <MoodCard mood={item} onMoodDelete={onMoodDelete} />
  );

  const noHistoryContent = (
    <View style={styles.noHistoryContainer}>
      <Text style={styles.noHistoryText}>No history data</Text>
      <NoDataImage />
    </View>
  );

  return (
    <View style={styles.historyScreenContainer}>
      {historyData.length > 0 ? (
        <FlatList data={historyData} renderItem={renderItem} />
      ) : (
        noHistoryContent
      )}
    </View>
  );
};
