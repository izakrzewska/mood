import React, { FC, useState } from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from 'react-native';
import { availableMoods } from '../../constants';
import { Card, Text, TextInput } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';
import { colors } from '../../themes';

import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { MainButton } from '../../components';

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
    alignItems: 'center',
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
  const [selectedMood, setSelectedMood] = useState<number>();
  const [note, setNote] = useState<string>();

  const onMoodSelected = (value: number) => {
    setSelectedMood(value);
  };

  const onChange = (note: string) => {
    setNote(note);
  };

  const onSave = async () => {
    const user = auth.currentUser!;
    try {
      const moodData = {
        value: selectedMood,
        belongsTo: user.uid,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        note: note,
      };
      const ref = db.collection('moods');
      await ref.add(moodData);
      navigation.push('MoodsStatistics');
    } catch (err) {
      console.log(err);
    }
  };
  // TODO: add steps and go back

  return (
    <View style={styles.newMoodContainer}>
      {selectedMood ? (
        <View>
          <View>
            <TouchableOpacity>
              <Card style={styles.moodCard}>
                <Text style={{ fontSize: 16 }}>{selectedMood}</Text>
              </Card>
            </TouchableOpacity>
          </View>
          <View style={{ width: SCREEN_WIDTH * 0.8 }}>
            <TextInput
              placeholder='Add note...'
              multiline
              numberOfLines={10}
              onChangeText={(value) => onChange(value)}
            />
          </View>
          <MainButton text='Save' mode='text' onPress={onSave} />
        </View>
      ) : (
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text>On a scale of 1 to 10 rate your today mood</Text>
          <View style={styles.moodCardsContainer}>
            {availableMoods.map(({ value }) => (
              <TouchableOpacity
                key={value}
                onPress={() => onMoodSelected(value)}
              >
                <Card style={styles.moodCard}>
                  <Text style={{ fontSize: 16 }}>{value}</Text>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};
