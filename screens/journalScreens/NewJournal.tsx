import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { MainButton } from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';

type NewJournalNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'NewJournal'
>;

type NewJournalScreenProps = {
  navigation: NewJournalNavigationProp;
};

export const NewJournal: FC<NewJournalScreenProps> = () => {
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
        <MainButton
          mode='text'
          text='Save'
          onPress={() => console.log('adding new')}
        />
      </View>
    </View>
  );
};
