import React, { FC, useState } from 'react';
import { View, Image } from 'react-native';
import { List, Text, useTheme } from 'react-native-paper';
import { IJournalFetched } from '../../types';
import { useFormatDate } from '../../hooks';

interface JournalEntryProps {
  item: IJournalFetched;
}

export const JournalEntry: FC<JournalEntryProps> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { formattedDate, formattedTime } = useFormatDate(item.date);
  const { colors } = useTheme();

  return (
    <List.Accordion
      title={item.title}
      expanded={isOpen}
      onPress={() => setIsOpen(!isOpen)}
      description={`${formattedDate}, ${formattedTime}`}
      style={{ backgroundColor: colors.background }}
    >
      <Text>{item.content}</Text>
      <View style={{ flexDirection: 'row' }}>
        {item.images &&
          item.images.map((image) => (
            <Image
              style={{
                marginHorizontal: 5,
                width: 100,
                height: 100,
              }}
              key={image}
              source={{ uri: image }}
            />
          ))}
      </View>
    </List.Accordion>
  );
};
