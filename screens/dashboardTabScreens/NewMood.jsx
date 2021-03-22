import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { availableMoods } from '../../constants';
import { Card } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

const styles = StyleSheet.create({
  moodsTabContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  moodCardsContainer: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  moodCard: {
    margin: 10,
    borderWidth: 1,
    padding: 30,
  },
});

export const NewMood = ({ navigation }) => {
  const onMoodSelected = async (value) => {
    const user = auth.currentUser;
    try {
      const moodData = {
        value: value,
        belongsTo: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
      const ref = db.collection('moods');
      await ref.add(moodData);
      navigation.push('moodsStatistics');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.moodsTabContainer}>
      <Text>On a scale of 1 to 10 rate your today mood</Text>
      <View style={styles.moodCardsContainer}>
        {availableMoods.map(({ value }) => (
          <TouchableOpacity key={value} onPress={() => onMoodSelected(value)}>
            <Card style={styles.moodCard}>
              <Text>{value}</Text>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
