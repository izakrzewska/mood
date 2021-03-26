import React, { FC, useState } from 'react';
import { Animated, StyleSheet, Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable, {
  SwipeableProperties,
} from 'react-native-gesture-handler/Swipeable';
import { Card, IconButton, Title } from 'react-native-paper';
import { IMoodFetchedHistory } from '../../types';
import { colors } from '../../themes';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import { Modal } from '../Modal/Modal';
import { MainButton } from '../MainButton/MainButton';

interface MoodCardProps {
  mood: IMoodFetchedHistory;
  openModal: (moodId: string) => void;
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

export const MoodCard: FC<MoodCardProps> = ({ mood, openModal }) => {
  const navigation = useNavigation();
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

  const onRightSwipe = (progress: any, dragX: any) => {
    const scale = dragX.interpolate({
      inputRange: [0, 200],
      outputRange: [1, 0],
    });

    return (
      <TouchableOpacity onPress={() => openModal(mood.id)} activeOpacity={0.6}>
        <Animated.View
          style={{
            transform: [{ scale: scale }],
            ...styles.deleteIconContainer,
          }}
        >
          <IconButton icon='delete' size={16} color={colors.grey} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  const onMoodEntrySelect = () => {
    navigation.navigate('MoodDetails', {
      moodId: mood.id,
    });
  };

  return (
    <Swipeable renderRightActions={onRightSwipe}>
      <TouchableOpacity onPress={onMoodEntrySelect}>
        <Card style={styles.card}>
          <Card.Title
            title={formattedDate}
            subtitle={formattedTime}
            right={() => <Title>{mood.value}</Title>}
            rightStyle={styles.valueContainer}
            left={() =>
              mood.hasNote ? (
                <FontAwesome name='file' size={20} color={colors.grey} />
              ) : null
            }
          />
        </Card>
      </TouchableOpacity>
    </Swipeable>
  );
};
