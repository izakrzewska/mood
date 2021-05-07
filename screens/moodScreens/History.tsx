import React, { FC, useState } from 'react';
import { ListRenderItem, View, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { DeleteModal, Loader, NoData, SwipeableCard } from '../../components';
import { useFormatDate } from '../../hooks';
import styles from './styles';
import { HistoryScreenNavigationProp, Mood } from './types';
import { useUser, useFirestore, useFirestoreCollectionData } from 'reactfire';

type HistoryScreenProps = {
  navigation: HistoryScreenNavigationProp;
};

export const History: FC<HistoryScreenProps> = ({ navigation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [toBeDeletedItemId, setToBeDeletedItemId] = useState<string>();

  const { data: user } = useUser();
  const userMoodsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('moods');
  const { status, data: moods } = useFirestoreCollectionData<Mood>(
    userMoodsRef
  );

  const openModal = (id: string) => {
    setIsModalVisible(true);
    setToBeDeletedItemId(id);
  };

  const onMoodDelete = async () => {
    try {
      await userMoodsRef.doc(toBeDeletedItemId).delete();
    } catch (error) {
      console.log('error');
    }
    setIsModalVisible(false);
  };

  const renderItem: ListRenderItem<Mood> = ({ item }) => {
    const { formattedDate, formattedTime, formattedWeekday } = useFormatDate(
      item.createdAt
    );
    return (
      <SwipeableCard
        onEdit={() =>
          navigation.navigate('EditMoodDetails', {
            id: item.NO_ID_FIELD,
          })
        }
        onDelete={() => openModal(item.NO_ID_FIELD)}
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

  if (status === 'loading') {
    return <Loader />;
  }

  return (
    <>
      <View style={styles.historyScreenContainer}>
        {moods.length ? (
          <FlatList
            keyExtractor={(item) => item.NO_ID_FIELD}
            data={moods}
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
