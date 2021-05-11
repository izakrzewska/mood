import DateTimePicker from '@react-native-community/datetimepicker';
import * as Permissions from 'expo-permissions';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { useFirestore, useFirestoreDocData, useUser } from 'reactfire';
import { colors } from '../../themes';

interface RemindersProps {
  title: string;
  id: string;
}

export const Reminders: FC<RemindersProps> = ({ title, id }) => {
  const [time, setTime] = useState(new Date(1598051730000));
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>();

  const { data: user } = useUser();

  const userRemindersSettings = useFirestore()
    .collection('users')
    .doc(user.uid)
    .collection('settings')
    .doc(id);

  const { status: status, data: settings } = useFirestoreDocData<{
    reminders: boolean;
    remindersTIme: any[];
  }>(userRemindersSettings);

  useEffect(() => {
    if (status === 'success') {
      Permissions.getAsync(Permissions.NOTIFICATIONS).then((response) => {
        if (response.status === 'granted') {
          setRemindersEnabled(settings.reminders);
        } else {
          setRemindersEnabled(false);
          onRemindersSubmit(false);
        }
      });
    }
  }, [status]);

  const onRemindersToggle = () => {
    if (remindersEnabled) {
      setRemindersEnabled(false);
      onRemindersSubmit(false);
    } else {
      Permissions.getAsync(Permissions.NOTIFICATIONS).then((response) => {
        if (response.status === 'granted') {
          setRemindersEnabled(true);
          onRemindersSubmit(true);
        } else {
          Alert.alert(
            'Sorry, no permissions',
            'Please, allow the app to send notifications',
            [
              { text: 'Close', style: 'default' },
              {
                text: 'Open settings',
                style: 'default',
                onPress: () => Linking.openSettings(),
              },
            ]
          );
        }
      });
    }
  };

  const onRemindersSubmit = async (value: boolean) => {
    try {
      await userRemindersSettings.set({
        reminders: value,
        remindersTime: [],
      });
    } catch (error) {
      console.log('error');
    }
  };

  const onChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>{title}</Text>
        <Switch
          color={colors.main}
          value={remindersEnabled}
          onValueChange={onRemindersToggle}
        />
      </View>
      {remindersEnabled && (
        <View>
          <DateTimePicker
            value={time}
            mode='time'
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        </View>
      )}
    </View>
  );
};
