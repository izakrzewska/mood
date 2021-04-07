import React, { FC } from 'react';
import { View } from 'react-native';
import { List, Text, Avatar, useTheme, IconButton } from 'react-native-paper';
import { IJournalFetched } from '../../types';
import { useFormatDate } from '../../hooks';
import { MainButton } from '../MainButton/MainButton';
import { Icon } from 'react-native-paper/lib/typescript/components/Avatar/Avatar';

interface JournalEntryProps {
  item: IJournalFetched;
  isOpen: boolean;
  setOpenId: any;
}

export const JournalEntry: FC<JournalEntryProps> = ({
  item,
  isOpen,
  setOpenId,
}) => {
  const { formattedDate, formattedTime } = useFormatDate(item.date);
  const { colors } = useTheme();

  return (
    <List.Accordion
      title=''
      expanded={isOpen}
      onPress={() => setOpenId(isOpen ? undefined : item.id)}
      description={`${formattedDate}, ${formattedTime}`}
      style={{ backgroundColor: colors.background }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          marginBottom: 20,
        }}
      >
        <View style={{ marginBottom: 20 }}>
          <Text>{item.content}</Text>
        </View>
        <View>
          <IconButton
            style={{ alignSelf: 'flex-end' }}
            icon='pencil'
            color={colors.primary}
          />
        </View>
      </View>
    </List.Accordion>
  );
};
