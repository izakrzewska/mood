import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { MainButton, Loader } from '../../components';
import { TextInput } from 'react-native-paper';
import { db } from '../../firebase';

type MoodDetailsScreenNavigationProp = StackNavigationProp<
  DashboardStackParamList,
  'MoodDetails'
>;

type MoodDetailsScreenRouteProp = RouteProp<
  DashboardStackParamList,
  'MoodDetails'
>;

type MoodDetailsScreenProps = {
  navigation: MoodDetailsScreenNavigationProp;
  route: MoodDetailsScreenRouteProp;
};

export const MoodDetails: FC<MoodDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const [moodData, setMoodData] = useState<number>();
  const [isLoading, setIsLoading] = useState(true);
  const [note, setNote] = useState<string>();
  const isFocused = useIsFocused();
  const { moodId } = route.params;
  const [inEdit, setInEdit] = useState(false);
  const [newValue, setNewValue] = useState<string>();

  useEffect(() => {
    const ref = db.collection('moods').doc(moodId);
    ref
      .get()
      .then((doc) => {
        if (doc.exists) {
          const value = doc.data().value;
          const note = doc.data().note;
          setMoodData(value);
          setNote(note);
          setIsLoading(false);
        } else {
          console.log('No such document!');
          setIsLoading(false);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onMoodValueEdit = () => {
    setInEdit(true);
  };

  const onMoodValueSave = async () => {
    setIsLoading(true);
    const ref = db.collection('moods').doc(moodId);

    try {
      await ref.set(
        {
          value: Number(newValue) || moodData,
          note: note,
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    setInEdit(false);
    navigation.replace('MoodDetails', { moodId });
  };

  const onMoodValueChange = (value: string) => {
    setNewValue(value);
  };

  const onNoteChange = (value: string) => {
    setNote(value);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        {inEdit ? (
          <>
            <TextInput
              keyboardType='numeric'
              label='Mood rate'
              mode='outlined'
              onChangeText={(value) => onMoodValueChange(value)}
              value={newValue}
              defaultValue={moodData?.toString()}
              style={{ width: 300 }}
            />
            <TextInput
              label='Note'
              mode='outlined'
              onChangeText={(value) => onNoteChange(value)}
              value={note}
              style={{ width: 300 }}
            />
          </>
        ) : (
          <View>
            <Text>{moodData}</Text>
            <Text>{note?.length > 0 ? note : null}</Text>
          </View>
        )}
      </View>
      <MainButton
        mode='text'
        text={inEdit ? 'Save' : 'Edit'}
        onPress={inEdit ? onMoodValueSave : onMoodValueEdit}
      />
    </View>
  );
};
