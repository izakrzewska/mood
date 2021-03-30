import React, { FC } from 'react';
import { View } from 'react-native';
import { auth, db } from '../../firebase';
import { Text } from 'react-native-paper';
import { MainButton, JournalForm } from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { JournalFormData } from '../../types';

type NewJournalNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'NewJournal'
>;

type NewJournalScreenProps = {
  navigation: NewJournalNavigationProp;
};

export const NewJournal: FC<NewJournalScreenProps> = ({ navigation }) => {
  const onSubmit = async (data: JournalFormData) => {
    const user = auth.currentUser!;
    try {
      const journalData = {
        content: data.content,
        belongsTo: user.uid,
        createdAt: new Date(),
      };
      const ref = db.collection('journals');
      await ref.add(journalData);
      navigation.push('JournalEntries');
    } catch (err) {
      console.log(err);
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
      <JournalForm onSubmit={onSubmit} />
    </View>
  );
};
