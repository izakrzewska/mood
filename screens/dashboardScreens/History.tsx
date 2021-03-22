import React, { FC, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../../firebase';
import { MoodFetched } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from '../../navigation/DashboardStack';

type HistoryScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'History'
>;

type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
};

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

  const onDelete = async (mood: MoodFetched) => {
    const ref = db.collection('moods').doc(mood.id);
    try {
      await ref.delete();
      navigation.push('MoodsStatistics');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView>
      <View>
        {historyData.map((mood) => {
          return (
            <TouchableOpacity key={mood.id} onLongPress={() => onDelete(mood)}>
              <View style={{ borderWidth: 1, borderColor: 'blue' }}>
                <Text>{mood.value}</Text>
                <Text>{mood.date.toLocaleString()}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};
