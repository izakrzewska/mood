import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MainButton } from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';

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
  const onNewEntry = () => {
    navigation.push('NewJournal');
  };

  return (
    <View
      style={{
        flex: 1,
        borderWidth: 1,
        borderColor: 'red',
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <View
        style={{ marginTop: 'auto', marginHorizontal: 30, marginBottom: 15 }}
      >
        <MainButton mode='text' text='Add new entry' onPress={onNewEntry} />
      </View>
    </View>
  );
};
