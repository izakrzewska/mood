import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { Dimensions, ListRenderItem, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import {
  ErrorNotification,
  Loader,
  MainButton,
  Modal,
  SuccessNotification,
  SwipeableCard,
  NoData,
} from '../../components';
import { db } from '../../firebase';
import { useGetMoods, useNotifySuccess, useFormatDate } from '../../hooks';
import { MoodStackParamList } from '../../navigation/MoodStack';
import { IError, IMoodFetched } from '../../types';

type HistoryScreenNavigationProp = StackNavigationProp<
  MoodStackParamList,
  'History'
>;

type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
};
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  historyScreenContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  card: {
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 0.8 * SCREEN_WIDTH,
    alignSelf: 'center',
  },
  valueContainer: {
    marginEnd: 20,
    justifyContent: 'center',
  },
});

export const History: FC<HistoryScreenProps> = ({ navigation }) => {
  const [error, setError] = useState<IError>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toBeDeletedItemId, setToBeDeletedItemId] = useState<string>();
  const isFocused = useIsFocused();
  const { isActive, openSuccess, message } = useNotifySuccess();

  const { moodsData, isLoading } = useGetMoods(isFocused, 'desc');

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
        openSuccess('Deleted successfuly');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const renderItem: ListRenderItem<IMoodFetched> = ({ item }) => {
    const { formattedDate, formattedTime, formattedWeekday } = useFormatDate(
      item.date
    );
    return (
      <SwipeableCard
        onEdit={() =>
          navigation.navigate('EditMoodDetails', {
            moodId: item.id,
            value: item.value,
          })
        }
        onDelete={() => openModal(item.id)}
      >
        <View style={styles.card}>
          <View style={{ flexGrow: 1 }}>
            <Text
              style={{ fontSize: 16 }}
            >{`${formattedDate}, ${formattedTime}`}</Text>
            <Text>{formattedWeekday}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={{ fontSize: 20 }}>{item.value}</Text>
          </View>
        </View>
      </SwipeableCard>
    );
  };

  return isLoading ? (
    <Loader />
  ) : (
    <>
      <View style={styles.historyScreenContainer}>
        {moodsData?.length > 0 ? (
          <FlatList data={moodsData} renderItem={renderItem} />
        ) : (
          <NoData />
        )}
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
      <ErrorNotification
        error={error}
        extraStyles={{ paddingHorizontal: 30 }}
      />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
