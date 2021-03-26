import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, ListRenderItem } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import {
  Loader,
  MoodCard,
  NoDataImage,
  Modal,
  MainButton,
  ErrorNotification,
} from '../../components';
import { auth, db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { IMoodFetchedHistory, IError } from '../../types';

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
  const [error, setError] = useState<IError>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toBeDeletedItemId, setToBeDeletedItemId] = useState<string>();
  const [historyData, setHistoryData] = useState<IMoodFetchedHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser!;

  useEffect(() => {
    const ref = db
      .collection('moods')
      .where('belongsTo', '==', user.uid)
      .orderBy('createdAt', 'desc');
    ref.onSnapshot((query) => {
      const historyDataArray: IMoodFetchedHistory[] = [];
      query.forEach((doc) => {
        const date =
          doc.data() && doc.data().createdAt && doc.data().createdAt.toDate();
        historyDataArray.push({
          id: doc.id,
          date,
          value: doc.data().value,
          hasNote: doc.data().note !== '',
        });
      });
      setHistoryData(historyDataArray);
      setIsLoading(false);
    });
  }, []);

  const openModal = (moodId: string) => {
    setIsModalVisible(true);
    setToBeDeletedItemId(moodId);
  };

  const onMoodDelete = () => {
    const ref = db.collection('moods').doc(toBeDeletedItemId);
    ref
      .delete()
      .then(() => {
        setIsModalVisible(false);
        setToBeDeletedItemId(undefined);
      })
      .catch((error) => {
        setError(error);
      });
  };

  const renderItem: ListRenderItem<IMoodFetchedHistory> = ({ item }) => (
    <MoodCard mood={item} openModal={openModal} />
  );

  const noHistoryContent = (
    <View style={styles.noHistoryContainer}>
      <Text style={styles.noHistoryText}>No history data</Text>
      <NoDataImage />
    </View>
  );

  return (
    <View style={styles.historyScreenContainer}>
      {isLoading ? (
        <Loader />
      ) : historyData.length > 0 ? (
        <FlatList data={historyData} renderItem={renderItem} />
      ) : (
        noHistoryContent
      )}
      <Modal isModalVisible={isModalVisible}>
        <Text>{`Are you sure you want to delete entry?`}</Text>
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <MainButton
            text='Close'
            mode='text'
            onPress={() => setIsModalVisible(false)}
            extraStyles={{ flexGrow: 1 }}
          />
          <MainButton
            text='Delete'
            mode='text'
            onPress={onMoodDelete}
            extraStyles={{ flexGrow: 1 }}
          />
        </View>
      </Modal>
      <ErrorNotification
        error={error}
        extraStyles={{ paddingHorizontal: 30 }}
      />
    </View>
  );
};
