import React, { FC } from 'react';
import { Animated, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Card, IconButton, Title } from 'react-native-paper';
import { MoodFetched } from '../../types';

interface MoodCardProps {
  mood: MoodFetched;
  onMoodDelete: (mood: MoodFetched) => void;
}
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 5,
    width: 0.8 * SCREEN_WIDTH,
    alignSelf: 'center',
  },
  valueContainer: {
    marginEnd: 20,
  },
  deleteIconContainer: {
    height: '100%',
    justifyContent: 'center',
    marginEnd: 35,
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

  const onDelete = () => {
    onMoodDelete(mood);
  };

  const onRightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
    });
    return (
      <TouchableOpacity onPress={onDelete} activeOpacity={0.6}>
        <Animated.View
          style={{
            transform: [{ scale: scale }],
            ...styles.deleteIconContainer,
          }}
        >
          <IconButton icon='delete' size={16} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={onRightSwipe}>
      <Card style={styles.card}>
        <Card.Title
          title={formattedDate}
          subtitle={formattedTime}
          right={() => <Title>{mood.value}</Title>}
          rightStyle={styles.valueContainer}
        />
      </Card>
    </Swipeable>
  );
};
