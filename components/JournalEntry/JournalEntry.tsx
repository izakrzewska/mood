import React, { FC } from 'react';
import { View } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { useFormatDate } from '../../hooks';
import { Journal } from '../../screens/journalScreens/types';

interface JournalEntryProps {
  item: Journal;
  isOpen: boolean;
  setOpenId: any;
}

export const JournalEntry: FC<JournalEntryProps> = ({
  item,
  isOpen,
  setOpenId,
}) => {
  const { formattedDate, formattedTime } = useFormatDate(item.createdAt);
  const { colors } = useTheme();

  return (
    <List.Accordion
      title={item.title}
      expanded={isOpen}
      onPress={() => setOpenId(isOpen ? undefined : item.NO_ID_FIELD)}
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
      </View>
    </List.Accordion>
  );
};
