import React, { FC, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import {
  DeleteModal,
  JournalEntry,
  Loader,
  MainButton,
  NoData,
  SwipeableCard,
} from '../../components';
import { JournalEntriesScreenNavigationProps, JournalType } from './types';

type JournalEntriesScreenProps = {
  navigation: JournalEntriesScreenNavigationProps;
};

export const JournalEntries: FC<JournalEntriesScreenProps> = ({
  navigation,
}) => {
  const [itemToBeDeleted, setItemToBeDeleted] = useState<string>();
  const [openId, setOpenId] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: user } = useUser();
  const userJournalsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('journals');
  const { status, data: journals } = useFirestoreCollectionData<JournalType>(
    userJournalsRef
  );

  const onNewEntry = () => {
    navigation.push('NewJournal');
  };

  const openModal = (journalId: string) => {
    setIsModalVisible(true);
    setItemToBeDeleted(journalId);
  };

  const onEntryDelete = async () => {
    await userJournalsRef.doc(itemToBeDeleted).delete();
    setIsModalVisible(false);
  };

  const onEdit = (id: string) => {
    navigation.navigate('JournalEdit', {
      id,
    });
  };

  const renderItem: ListRenderItem<JournalType> = ({ item }) => {
    const isOpen = openId === item.NO_ID_FIELD;
    return (
      <>
        <SwipeableCard
          onEdit={() => onEdit(item.NO_ID_FIELD)}
          onDelete={() => openModal(item.NO_ID_FIELD)}
          enabled={!isOpen}
        >
          <JournalEntry
            isOpen={isOpen}
            item={item}
            setOpenId={() => setOpenId(isOpen ? undefined : item.NO_ID_FIELD)}
          />
          <Divider />
        </SwipeableCard>
      </>
    );
  };

  if (status === 'loading') {
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
        {journals?.length > 0 ? (
          <FlatList
            data={journals}
            keyExtractor={(item) => item.NO_ID_FIELD}
            renderItem={renderItem}
          />
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
      </View>
      <DeleteModal
        isModalVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onDelete={onEntryDelete}
      />
    </>
  );
};
