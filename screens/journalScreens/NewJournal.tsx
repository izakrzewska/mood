import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { JournalForm, Loader } from '../../components';
import {
  addJournal,
  useJournals,
} from '../../contexts/journals/journalsContext';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { JournalFormData } from '../../types';

type NewJournalNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'NewJournal'
>;

type NewJournalScreenProps = {
  navigation: NewJournalNavigationProp;
};

export const NewJournal: FC<NewJournalScreenProps> = ({ navigation }) => {
  const { state, dispatch } = useJournals();
  const onSubmit = (data: JournalFormData) => {
    addJournal(data, dispatch);
    navigation.navigate('JournalEntries');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      {state.isLoading ? <Loader /> : <JournalForm onSubmit={onSubmit} />}
    </View>
  );
};
