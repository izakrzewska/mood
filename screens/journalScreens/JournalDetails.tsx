import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { JournalStackParamList } from '../../navigation/JournalStack';

type JournalDetailsNavigationProp = StackNavigationProp<
  JournalStackParamList,
  'NewJournal'
>;

type JournalDetailsScreenProps = {
  navigation: JournalDetailsNavigationProp;
};

export const JournalDetails: FC<JournalDetailsScreenProps> = ({
  navigation,
}) => {
  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 30,
      }}
    >
      <Text>elo, details</Text>
    </View>
  );
};
