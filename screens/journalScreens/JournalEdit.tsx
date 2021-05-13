import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { JournalForm } from '../../components';
import { useNotificationContext } from '../../context';
import {
  editJournal,
  useJournalsReducer,
} from '../../reducers/journals/journalsReducer';
import { JournalFormData } from '../../reducers/journals/types';
import {
  JournalEditScreenNavigationProps,
  JournalEditScreenRouteProp,
} from './types';

export const JournalEdit: FC = () => {
  const navigation = useNavigation<JournalEditScreenNavigationProps>();
  const {
    params: { id, title, content },
  } = useRoute<JournalEditScreenRouteProp>();
  const [_, dispatch] = useJournalsReducer();
  const { showNotification } = useNotificationContext();

  const onSubmit = (journal: JournalFormData) => {
    editJournal(id, journal, dispatch, showNotification).then(() => {
      navigation.navigate('JournalEntries');
    });
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <View style={{ flex: 1 }}>
        <JournalForm
          onSubmit={onSubmit}
          defaultValues={{ content: content, title: title }}
        />
      </View>
    </View>
  );
};
