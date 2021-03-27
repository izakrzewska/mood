import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, Text, TextInput } from 'react-native-paper';
import { MainButton, MoodForm } from '../../components';
import { availableMoods } from '../../constants';
import { auth, db } from '../../firebase';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { colors } from '../../themes';
import { MoodFormData } from '../../types';

type NewMoodScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'NewMood'
>;

type NewMoodScreenProps = {
  navigation: NewMoodScreenNavigationProp;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  newMoodContainer: {
    flex: 1,
    paddingVertical: 30,
  },
  moodCardsContainer: {
    paddingHorizontal: 20,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignContent: 'center',
  },
  moodCard: {
    shadowColor: colors.grey,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    marginVertical: 10,
    alignItems: 'center',
    padding: 15,
    margin: 10,
    minWidth: 50,
    height: 50,
  },
});

export const NewMood: FC<NewMoodScreenProps> = ({ navigation }) => {
  const onSubmit = async (data: MoodFormData) => {
    const user = auth.currentUser!;
    try {
      const moodData = {
        value: Number(data.value),
        belongsTo: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const ref = db.collection('moods');
      await ref.add(moodData);
      navigation.push('MoodsStatistics');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.newMoodContainer}>
      <MoodForm onSubmit={onSubmit} />
    </View>
  );
};
