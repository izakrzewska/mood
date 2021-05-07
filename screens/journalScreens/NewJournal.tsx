import React, { FC } from 'react';
import { View } from 'react-native';
import { useFirestore, useUser } from 'reactfire';
import { JournalForm } from '../../components';
import {
  JournalFormDataType,
  NewJournalScreenNavigationProps,
} from '../../screens/journalScreens/types';

type NewJournalScreenProps = {
  navigation: NewJournalScreenNavigationProps;
};

export const NewJournal: FC<NewJournalScreenProps> = ({ navigation }) => {
  const { data: user } = useUser();
  const userJournalsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('journals');

  const addJournal = async (data: JournalFormDataType) => {
    try {
      const journalData = {
        title: data.title,
        content: data.content,
        createdAt: new Date(),
      };
      await userJournalsRef.add(journalData);
      navigation.navigate('JournalEntries');
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <JournalForm onSubmit={addJournal} />
    </View>
  );
};
