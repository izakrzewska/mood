import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import { Divider } from 'react-native-paper';
import {
  DeleteModal,
  ErrorNotification,
  JournalEntry,
  Loader,
  MainButton,
  NoData,
  SuccessNotification,
  SwipeableCard,
} from '../../components';
import { auth, db } from '../../firebase';
import { useNotifySuccess } from '../../hooks';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { IError, IJournalFetched } from '../../types';

type JournalEntriesNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'JournalEntries'
>;

type JournalEntriesScreenProps = {
  navigation: JournalEntriesNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 0.8 * SCREEN_WIDTH,
    alignSelf: 'center',
  },
});

export const JournalEntries: FC<JournalEntriesScreenProps> = ({
  navigation,
}) => {
  const { openSuccess, isActive, message } = useNotifySuccess();
  const isFocused = useIsFocused();
  const [error, setError] = useState<IError>();
  const [openId, setOpenId] = useState<string>();
  const [itemToBeDeleted, setItemToBeDeleted] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [journalsData, setJournalsData] = useState<IJournalFetched[]>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = auth.currentUser!;
  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      const ref = db
        .collection('journals')
        .where('belongsTo', '==', user.uid)
        .orderBy('createdAt', 'desc');
      ref.onSnapshot((query) => {
        const journalsDataArray: any = [];
        query.forEach((doc) => {
          journalsDataArray.push({
            id: doc.id,
            date: doc.data().createdAt,
            content: doc.data().content,
            images: doc.data().images,
            isOpen: false,
          });
        });
        setJournalsData(journalsDataArray);
        setIsLoading(false);
      });
    };

    if (isFocused) {
      fetchData();
    }
  }, [isFocused]);

  const onNewEntry = () => {
    navigation.push('NewJournal');
  };

  const openModal = (journalId: string) => {
    setIsModalVisible(true);
    setItemToBeDeleted(journalId);
  };

  const onEntryDelete = () => {
    const ref = db.collection('journals').doc(itemToBeDeleted);
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

  const renderItem: ListRenderItem<IJournalFetched> = ({ item }) => {
    return (
      <>
        <SwipeableCard
          onEdit={() =>
            navigation.navigate('JournalEdit', {
              content: item.content,
              images: item.images,
              id: item.id,
            })
          }
          onDelete={() => openModal(item.id)}
        >
          <JournalEntry
            isOpen={openId === item.id}
            item={item}
            setOpenId={setOpenId}
          />
        </SwipeableCard>
        <Divider />
      </>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        {isLoading ? (
          <Loader />
        ) : journalsData?.length > 0 ? (
          <FlatList data={journalsData} renderItem={renderItem} />
        ) : (
          <NoData />
        )}
        <MainButton
          mode='text'
          text='New entry'
          onPress={onNewEntry}
          extraStyles={{
            marginTop: 25,
            marginHorizontal: 30,
          }}
        />
      </View>
      <DeleteModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={onEntryDelete}
      />
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
