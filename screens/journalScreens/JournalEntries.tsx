import React, { FC, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { IconButton, Text, useTheme, List, Divider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import {
  MainButton,
  SwipeableCard,
  NoData,
  Loader,
  DeleteModal,
  SuccessNotification,
  ErrorNotification,
} from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { IError, IJournalFetched } from '../../types';
import { useFormatDate, useNotifySuccess } from '../../hooks';

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
  const { colors } = useTheme();
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
            title: doc.data().title,
            images: doc.data().photos,
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
    const { formattedDate, formattedTime } = useFormatDate(item.date);

    return (
      <>
        <SwipeableCard
          onEdit={() => console.log('edit')}
          onDelete={() => openModal(item.id)}
        >
          <List.Accordion
            title={item.title}
            expanded={openId === item.id}
            onPress={() =>
              openId === item.id ? setOpenId(undefined) : setOpenId(item.id)
            }
            description={`${formattedDate}, ${formattedTime}`}
            style={{ backgroundColor: colors.background }}
          >
            <Text>{item.content}</Text>
            <View style={{ flexDirection: 'row' }}>
              {item.images &&
                item.images.map((image) => (
                  <Image
                    style={{
                      marginHorizontal: 5,
                      width: 100,
                      height: 100,
                    }}
                    key={image}
                    source={{ uri: image }}
                  />
                ))}
            </View>
          </List.Accordion>
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
