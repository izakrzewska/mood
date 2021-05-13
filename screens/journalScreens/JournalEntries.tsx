import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Divider } from 'react-native-paper';
import {
  DeleteModal,
  JournalEntry,
  MainButton,
  NoData,
  SwipeableCard,
  Loader,
} from '../../components';
import { useNotificationContext } from '../../context';
import {
  deleteJournal,
  getJournals,
  useJournalsReducer,
} from '../../reducers/journals/journalsReducer';
import { Journal } from '../../reducers/journals/types';
import { JournalEntriesScreenNavigationProps } from './types';

export const JournalEntries: FC = () => {
  const navigation = useNavigation<JournalEntriesScreenNavigationProps>();
  const isFocused = useIsFocused();
  const [state, dispatch] = useJournalsReducer();
  const [itemToBeDeleted, setItemToBeDeleted] = useState<string>();
  const [openId, setOpenId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { showNotification } = useNotificationContext();

  useEffect(() => {
    if (isFocused) {
      getJournals(dispatch, showNotification);
    }
  }, [isFocused]);

  const openModal = (journalId: string) => {
    setIsModalVisible(true);
    setItemToBeDeleted(journalId);
  };

  const onDelete = () => {
    deleteJournal(
      itemToBeDeleted!,
      dispatch,
      () => setIsModalVisible(false),
      showNotification
    );
    navigation.push('JournalEntries');
  };

  const onEdit = (id: string, title: string, content: string) => {
    navigation.navigate('JournalEdit', {
      id,
      title,
      content,
    });
  };

  const renderItem: ListRenderItem<Journal> = ({ item }) => {
    const isOpen = openId === item.id;
    return (
      <>
        <SwipeableCard
          onEdit={() => onEdit(item.id, item.title, item.content)}
          onDelete={() => openModal(item.id)}
          enabled={!isOpen}
        >
          <JournalEntry
            isOpen={isOpen}
            item={item}
            setOpenId={() => setOpenId(isOpen ? undefined : item.id)}
          />
          <Divider />
        </SwipeableCard>
      </>
    );
  };

  if (state.isLoading) {
    return <Loader />;
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          paddingVertical: 20,
          paddingHorizontal: 30,
        }}
      >
        {state.journals.length ? (
          <FlatList
            data={state.journals}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
        ) : (
          <NoData />
        )}
        <MainButton
          mode='outlined'
          text='New entry'
          onPress={() => navigation.navigate('NewJournal')}
          extraStyles={{
            marginTop: 25,
            marginHorizontal: 30,
          }}
        />
      </View>
      <DeleteModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={onDelete}
      />
    </>
  );
};
