import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Animated, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Card, Title } from 'react-native-paper';
import { IMoodFetched } from '../../types';
import { MainButton } from '../MainButton/MainButton';

interface MoodCardProps {
  mood: IMoodFetched;
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
  hiddenButtonsContainer: {
    height: '100%',
    flexDirection: 'row',
    marginEnd: 15,
  },
});

export const MoodCard: FC<MoodCardProps> = ({ mood, openModal }) => {
  const navigation = useNavigation();
  const formattedTime = mood.date.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = mood.date.toDate().toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });

  const onRightSwipe = () => {
    return (
      <Animated.View style={styles.hiddenButtonsContainer}>
        <MainButton
          mode='text'
          text='Edit'
          onPress={() =>
            navigation.navigate('EditMoodDetails', {
              moodId: mood.id,
              value: mood.value,
            })
          }
        />
        <MainButton
          mode='text'
          text='Delete'
          onPress={() => openModal(mood.id)}
        />
      </Animated.View>
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
