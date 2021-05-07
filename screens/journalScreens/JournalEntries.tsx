import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { FlatList, ListRenderItem, View, Text } from 'react-native';
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
import { db } from '../../firebase';
import { useNotifySuccess } from '../../hooks';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { IError, IJournalFetched } from '../../types';
import {
  useJournals,
  fetchJournals,
  deleteJournal,
} from '../../contexts/journals/journalsContext';

type JournalEntriesNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'JournalEntries'
>;

type JournalEntriesScreenProps = {
  navigation: JournalEntriesNavigationProp;
};

export const JournalEntries: FC<JournalEntriesScreenProps> = ({
  navigation,
}) => {
  const { openSuccess, isActive, message } = useNotifySuccess();
  const [error, setError] = useState<IError>();
  const [itemToBeDeleted, setItemToBeDeleted] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { state: journalsState, dispatch: journalsDispatch } = useJournals();

  useEffect(() => {
    fetchJournals(journalsDispatch);
  }, []);

  const onNewEntry = () => {
    navigation.push('NewJournal');
  };

  const openModal = (journalId: string) => {
    setIsModalVisible(true);
    setItemToBeDeleted(journalId);
  };

  const onEntryDelete = () => {
    deleteJournal(itemToBeDeleted as string, journalsDispatch);
  };

  const onEdit = ({ id, content }: IJournalFetched) => {
    navigation.navigate('JournalEdit', {
      content: content,
      id: id,
    });
  };

  const renderItem: ListRenderItem<IJournalFetched> = ({ item }) => {
    const isOpen = journalsState.openId === item.id;
    return (
      <>
        <SwipeableCard
          onEdit={() => onEdit(item)}
          onDelete={() => openModal(item.id)}
          enabled={!isOpen}
        >
          <JournalEntry
            isOpen={isOpen}
            item={item}
            setOpenId={() =>
              journalsDispatch({
                type: 'SET_OPEN_ID',
                pyaload: isOpen ? undefined : item.id,
              })
            }
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
        {journalsState.isLoading ? (
          <Loader />
        ) : (
          <>
            {journalsState.journals && journalsState.journals?.length > 0 ? (
              <FlatList data={journalsState.journals} renderItem={renderItem} />
            ) : (
              <NoData />
            )}

            <MainButton
              mode='outlined'
              text='New entry'
              onPress={onNewEntry}
              extraStyles={{
                marginTop: 25,
                marginHorizontal: 30,
              }}
            />
          </>
        )}
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
