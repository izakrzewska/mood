import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import {
  ErrorNotification,
  Loader,
  MainButton,
  Modal,
  MoodCard,
  NoDataImage,
} from '../../components';
import { db } from '../../firebase';
import { useGetMoods } from '../../hooks';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { IError, IMoodFetched } from '../../types';

type HistoryScreenNavigationProp = StackNavigationProp<
  MoodStackParamList,
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
  const isFocused = useIsFocused();

  const { moodsData, isLoading } = useGetMoods(isFocused);

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

  const renderItem: ListRenderItem<IMoodFetched> = ({ item }) => (
    <MoodCard mood={item} openModal={openModal} />
  );

  const noHistoryContent = (
    <View style={styles.noHistoryContainer}>
      <Text style={styles.noHistoryText}>No history data</Text>
      <NoDataImage />
    </View>
  );

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <View style={styles.historyScreenContainer}>
        {moodsData?.length > 0 ? (
          <FlatList data={moodsData} renderItem={renderItem} />
        ) : (
          noHistoryContent
        )}

        <ErrorNotification
          error={error}
          extraStyles={{ paddingHorizontal: 30 }}
        />
      </View>
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
    </>
  );
};
