import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../../firebase';

export const History = ({ navigation }) => {
  const [historyData, setHistoryData] = useState({ data: [], loaded: false });
  const user = auth.currentUser;

  useEffect(() => {
    const ref = db
      .collection('moods')
      .where('belongsTo', '==', user.uid)
      .orderBy('createdAt', 'desc');
    ref.onSnapshot((query) => {
      const historyData = [];
      query.forEach((doc) => {
        const date =
          doc.data() && doc.data().createdAt && doc.data().createdAt.toDate();
        historyData.push({
          id: doc.id,
          date,
          ...doc.data(),
        });
      });
      setHistoryData({ data: historyData, loaded: true });
    });
  }, []);

  const onDelete = async (mood) => {
    const ref = db.collection('moods').doc(mood.id);
    try {
      await ref.delete();
      navigation.push('moodsStatistics');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView>
      <View>
        {historyData.loaded &&
          historyData.data.map((mood) => {
            return (
              <TouchableOpacity
                key={mood.id}
                onLongPress={() => onDelete(mood)}
              >
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
