import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { ErrorNotification, JournalForm } from '../../components';
import { db } from '../../firebase';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { JournalFormData } from '../../types';
import {
  editJournal,
  useJournals,
} from '../../contexts/journals/journalsContext';
type JournalEditNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'JournalEdit'
>;

type JournalDetailsRouteProp = RouteProp<JournalStackParamList, 'JournalEdit'>;

type JournalEditScreenProps = {
  navigation: JournalEditNavigationProp;
  route: JournalDetailsRouteProp;
};

export const JournalEdit: FC<JournalEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { content, id } = route.params;
  const { state, dispatch } = useJournals();
  const [error, setHasError] = useState();

  const onSubmit = (data: JournalFormData) => {
    editJournal(data, id, dispatch);
    navigation.navigate('JournalEntries');
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
        <View style={{ flex: 1 }}>
          <JournalForm
            onSubmit={onSubmit}
            defaultValues={{ content: content }}
          />
        </View>
      </View>
      <ErrorNotification error={error} />
    </>
  );
};
