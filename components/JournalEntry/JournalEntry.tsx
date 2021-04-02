import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { List, Text, Avatar, useTheme } from 'react-native-paper';
import { IJournalFetched } from '../../types';
import { useFormatDate } from '../../hooks';

interface JournalEntryProps {
  item: IJournalFetched;
  isOpen: boolean;
  setOpenId: (id: string | undefined) => void;
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
        {item.images && (
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 10,
            }}
          >
            {item.images.map((image) => (
              <Image
                style={{
                  marginHorizontal: 2,
                  width: 100,
                  height: 100,
                }}
                key={image}
                source={{ uri: image }}
              />
            ))}
          </View>
        )}
      </View>
    </List.Accordion>
  );
};
