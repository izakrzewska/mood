import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Title } from 'react-native-paper';
import { MoodFetched } from '../../types';

interface MoodCardProps {
  mood: MoodFetched;
  onMoodDelete: (mood: MoodFetched) => void;
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
  },
  valueContainer: {
    marginEnd: 20,
  },
});

export const MoodCard: FC<MoodCardProps> = ({ mood, onMoodDelete }) => {
  const formattedTime = mood.date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = mood.date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onLongPress={() => onMoodDelete(mood)}
    >
      <Card>
        <Card.Title
          title={formattedDate}
          subtitle={formattedTime}
          right={() => <Title>{mood.value}</Title>}
          rightStyle={styles.valueContainer}
        />
      </Card>
    </TouchableOpacity>
  );
};
