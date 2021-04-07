import { useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useEffect, useReducer, useState } from 'react';
import { FlatList, ListRenderItem, View } from 'react-native';
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
import { initialJournalsState, journalsReducer } from '../../reducers';
import { IError, IJournalFetched } from '../../types';

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
  const [state, dispatch] = useReducer(journalsReducer, initialJournalsState);
  const isFocused = useIsFocused();
  const [error, setError] = useState<IError>();
  const [itemToBeDeleted, setItemToBeDeleted] = useState<string>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const user = auth.currentUser!;

  useEffect(() => {
    const fetchData = () => {
      console.log('fires');
      dispatch({ type: 'START_LOADING' });
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
            isOpen: false,
          });
        });
        dispatch({ type: 'SET_JOURNALS', payload: journalsDataArray });
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

  const onEdit = ({ id, content }: IJournalFetched) => {
    navigation.navigate('JournalEdit', {
      content: content,
      id: id,
    });
  };

  const renderItem: ListRenderItem<IJournalFetched> = ({ item }) => {
    const isOpen = state.openId === item.id;
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
              dispatch({
                type: 'SET_OPEN',
                payload: isOpen ? undefined : item.id,
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
        {state.isLoading ? (
          <Loader />
        ) : state.journals && state.journals?.length > 0 ? (
          <FlatList data={state.journals} renderItem={renderItem} />
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
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
