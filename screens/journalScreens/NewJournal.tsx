import React, { FC } from 'react';
import { View } from 'react-native';
import { useFirestore, useUser } from 'reactfire';
import { JournalForm } from '../../components';
import { useNotificationContext } from '../../context';
import {
  JournalFormData,
  NewJournalScreenNavigationProps,
} from '../../screens/journalScreens/types';

type NewJournalScreenProps = {
  navigation: NewJournalScreenNavigationProps;
};

export const NewJournal: FC<NewJournalScreenProps> = ({ navigation }) => {
  const { data: user } = useUser();
  const { showNotification } = useNotificationContext();
  const userJournalsRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('journals');

  const addJournal = async (data: JournalFormData) => {
    try {
      const journalData = {
        title: data.title,
        content: data.content,
        createdAt: new Date(),
      };
      await userJournalsRef.add(journalData);
      navigation.navigate('JournalEntries');
    } catch ({ message }) {
      showNotification(message, 'error');
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
