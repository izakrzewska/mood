import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Text } from 'react-native-paper';
import { DeleteModal, Loader, NoData, SwipeableCard } from '../../components';
import { useNotificationContext } from '../../context';
import { useFormatDate } from '../../hooks';
import {
  deleteMood,
  getMoods,
  useMoodsReducer,
} from '../../reducers/moods/moodsReducer';
import styles from './styles';
import { HistoryScreenNavigationProp, Mood } from './types';

export const History: FC = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toBeDeletedItemId, setToBeDeletedItemId] = useState<string>();
  const [state, dispatch] = useMoodsReducer();
  const { showNotification } = useNotificationContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getMoods(dispatch, showNotification);
    }
  }, [isFocused]);

  const openModal = (id: string) => {
    setIsModalVisible(true);
    setToBeDeletedItemId(id);
  };

  const onMoodDelete = () => {
    deleteMood(
      toBeDeletedItemId!,
      dispatch,
      () => setIsModalVisible(false),
      showNotification
    ).then(() => navigation.push('History'));
  };

  const renderItem: ListRenderItem<Mood> = ({ item }) => {
    const { formattedDate, formattedTime, formattedWeekday } = useFormatDate(
      item.createdAt
    );
    return (
      <SwipeableCard
        onEdit={() =>
          navigation.navigate('EditMoodDetails', {
            id: item.id,
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

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <View style={styles.historyScreenContainer}>
        {state.moods.length ? (
          <FlatList
            keyExtractor={(item) => item.id}
            data={state.moods}
            renderItem={renderItem}
          />
        ) : (
          <NoData />
        )}
      </View>
      <DeleteModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={onMoodDelete}
      />
    </>
  );
};
