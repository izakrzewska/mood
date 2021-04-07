import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { FC, useState, useReducer } from 'react';
import { db, auth } from '../../firebase';
import { View, Keyboard } from 'react-native';
import { Text } from 'react-native-paper';
import { JournalStackParamList } from '../../navigation/JournalStack';
import {
  ErrorNotification,
  JournalForm,
  SuccessNotification,
} from '../../components';
import { JournalFormData } from '../../types';
import { useNotifySuccess } from '../../hooks';
import { initialJournalsState, journalsReducer } from '../../reducers';
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
  const [error, setHasError] = useState();

  const onSubmit = (data: JournalFormData) => {
    const ref = db.collection('journals').doc(id);

    ref
      .set(
        {
          content: data.content,
        },
        { merge: true }
      )
      .then(() => {
        navigation.navigate('JournalEntries');
      })
      .catch((error) => {
        setHasError(error);
      });

    return () => {};
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
