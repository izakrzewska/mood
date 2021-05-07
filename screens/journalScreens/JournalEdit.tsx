import React, { FC } from 'react';
import { View } from 'react-native';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { JournalForm, Loader } from '../../components';
import {
  JournalEditScreenNavigationProps,
  JournalEditScreenRouteProp,
  JournalFormDataType,
  JournalType,
} from './types';

type JournalEditScreenProps = {
  navigation: JournalEditScreenNavigationProps;
  route: JournalEditScreenRouteProp;
};

export const JournalEdit: FC<JournalEditScreenProps> = ({
  navigation,
  route,
}) => {
  const { id } = route.params;
  const { data: user } = useUser();

  const editedJournalRef = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('journals')
    .doc(id);

  const { status, data: journal } = useFirestoreDocData<JournalType>(
    editedJournalRef
  );

  const onSubmit = (data: JournalFormDataType) => {
    editedJournalRef.set(
      {
        content: data.content,
        title: data.title,
      },
      { merge: true }
    );
    navigation.navigate('JournalEntries');
  };

  if (status === 'loading') {
    return <Loader />;
  }

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
          defaultValues={{ content: journal.content, title: journal.title }}
        />
      </View>
    </View>
  );
};
