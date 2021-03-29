import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {
  Card,
  Title,
  Divider,
  Text,
  Badge,
  useTheme,
  Chip,
} from 'react-native-paper';
import { colors } from '../../themes';
import { IMoodFetched } from '../../types';
import { MainButton } from '../MainButton/MainButton';

interface MoodCardProps {
  mood: IMoodFetched;
  openModal: (moodId: string) => void;
}
const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  card: {
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    backgroundColor: 'white',
    width: 0.8 * SCREEN_WIDTH,
    alignSelf: 'center',
  },
  valueContainer: {
    marginEnd: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    justifyContent: 'center',
  },
  hiddenButtonsContainer: {
    height: '100%',
    flexDirection: 'row',
    marginEnd: 15,
  },
});

export const MoodCard: FC<MoodCardProps> = ({ mood, openModal }) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const formattedTime = mood.date.toDate().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formattedDate = mood.date.toDate().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedDay = mood.date.toDate().toLocaleDateString(undefined, {
    weekday: 'long',
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
    <>
      <Swipeable renderRightActions={onRightSwipe}>
        <View style={styles.card}>
          <View style={{ flexGrow: 1 }}>
            <Text
              style={{ fontSize: 16 }}
            >{`${formattedDate}, ${formattedTime}`}</Text>
            <Text>{formattedDay}</Text>
          </View>
          <View style={styles.valueContainer}>
            <Text style={{ fontSize: 20 }}>{mood.value}</Text>
          </View>
        </View>
      </Swipeable>
      <Divider />
    </>
  );
};
