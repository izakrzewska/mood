import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { JournalStackParamList } from '../../navigation/JournalStack';

type JournalDetailsNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'JournalDetails'
>;

type JournalDetailsRouteProp = RouteProp<
  JournalStackParamList,
  'JournalDetails'
>;

type JournalDetailsScreenProps = {
  navigation: JournalDetailsNavigationProp;
  route: JournalDetailsRouteProp;
};

export const JournalDetails: FC<JournalDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { title, content, formattedDate } = route.params;
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <View>
        <Text>{`${formattedDate.formattedDate} ${formattedDate.formattedTime}`}</Text>
        <Text>{title}</Text>
        <Text>{content}</Text>
      </View>
    </View>
  );
};
