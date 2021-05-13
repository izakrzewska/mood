import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { JournalForm } from '../../components';
import { useNotificationContext } from '../../context';
import {
  addJournal,
  useJournalsReducer,
} from '../../reducers/journals/journalsReducer';
import { JournalFormData } from '../../reducers/journals/types';
import { NewJournalScreenNavigationProps } from '../../screens/journalScreens/types';

export const NewJournal: FC = () => {
  const navigation = useNavigation<NewJournalScreenNavigationProps>();
  const [_, dispatch] = useJournalsReducer();
  const { showNotification } = useNotificationContext();

  const onSubmit = (journal: JournalFormData) => {
    addJournal(journal, dispatch, showNotification).then(() =>
      navigation.navigate('JournalEntries')
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
      <JournalForm onSubmit={onSubmit} />
    </View>
  );
};
