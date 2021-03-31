import React, { FC, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  ListRenderItem,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { IconButton, Text, useTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { auth, db } from '../../firebase';
import { MainButton, SwipeableCard, NoData, Loader } from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { IJournalFetched } from '../../types';
import { useFormatDate } from '../../hooks';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [journalsData, setJournalsData] = useState<IJournalFetched[]>();
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
        const journalsDataArray: IJournalFetched[] = [];
        query.forEach((doc) => {
          journalsDataArray.push({
            id: doc.id,
            date: doc.data().createdAt,
            content: doc.data().content,
            title: doc.data().title,
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

  const renderItem: ListRenderItem<IJournalFetched> = ({ item }) => {
    const { formattedDate, formattedTime, formattedWeekday } = useFormatDate(
      item.date
    );
    return (
      <SwipeableCard
        onEdit={() => console.log('edit')}
        onDelete={() => console.log('delete')}
      >
        <View style={styles.card}>
          <View style={{ flexGrow: 1 }}>
            <Text style={{ fontSize: 16, marginBottom: 5 }}>{item.title}</Text>
            <Text>{`${formattedDate}, ${formattedTime}`}</Text>
            <Text>{formattedWeekday}</Text>
          </View>
          <IconButton
            icon='note-text-outline'
            color={colors.primary}
            onPress={() =>
              navigation.navigate('JournalDetails', {
                title: item.title,
                content: item.content,
                formattedDate: {
                  formattedDate,
                  formattedTime,
                  formattedWeekday,
                },
              })
            }
          />
        </View>
      </SwipeableCard>
    );
  };

  return (
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
          marginTop: 'auto',
          marginHorizontal: 30,
        }}
      />
    </View>
  );
};
