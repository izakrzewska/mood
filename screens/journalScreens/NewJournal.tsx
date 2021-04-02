import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { auth, db } from '../../firebase';
import { Text } from 'react-native-paper';
import { MainButton, JournalForm, ErrorNotification } from '../../components';
import { JournalStackParamList } from '../../navigation/JournalStack';
import { StackNavigationProp } from '@react-navigation/stack';
import { IError, JournalFormData } from '../../types';

type NewJournalNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'NewJournal'
>;

type NewJournalScreenProps = {
  navigation: NewJournalNavigationProp;
};

export const NewJournal: FC<NewJournalScreenProps> = ({ navigation }) => {
  const [error, setError] = useState<IError>();
  const onSubmit = async (data: JournalFormData) => {
    const user = auth.currentUser!;
    try {
      const journalData = {
        content: data.content,
        belongsTo: user.uid,
        createdAt: new Date(),
        images: data.images,
      };
      const ref = db.collection('journals');
      await ref.add(journalData);
      navigation.push('JournalEntries');
    } catch (error) {
      setError(error);
    }
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
        <JournalForm onSubmit={onSubmit} />
      </View>
      <ErrorNotification error={error} />
    </>
  );
};
