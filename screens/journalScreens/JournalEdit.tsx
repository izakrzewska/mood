import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { FC, useState } from 'react';
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
  const { isActive, openSuccess, message } = useNotifySuccess();
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
        Keyboard.dismiss();
        openSuccess('Updated successfuly');
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
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
