import React, { FC, useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { DashboardStackParamList } from '../../navigation/DashboardStack';
import { RouteProp, useIsFocused } from '@react-navigation/native';
import { MainButton } from '../../components';
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
          setMoodData(value);
        } else {
          console.log('No such document!');
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const onMoodValueEdit = () => {
    setInEdit(true);
  };

  const onMoodValueSave = async () => {
    const ref = db.collection('moods').doc(moodId);

    try {
      await ref.set(
        {
          value: Number(newValue),
        },
        { merge: true }
      );
    } catch (err) {
      console.log(err);
    }
    setInEdit(false);
    navigation.replace('MoodDetails', { moodId });
  };

  const onChange = (value: string) => {
    setNewValue(value);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View>
        {inEdit ? (
          <TextInput
            keyboardType='numeric'
            label='Mood rate'
            mode='outlined'
            onChangeText={(value) => onChange(value)}
            value={newValue}
            style={{ width: 300 }}
          />
        ) : (
          <Text>{moodData}</Text>
        )}
      </View>
      <MainButton
        mode='text'
        text={inEdit ? 'Save' : 'Edit mood value'}
        onPress={inEdit ? onMoodValueSave : onMoodValueEdit}
      />
    </View>
  );
};
