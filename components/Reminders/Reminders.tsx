import DateTimePicker from '@react-native-community/datetimepicker';
import * as Permissions from 'expo-permissions';
import React, { FC, useEffect, useState } from 'react';
import { Alert, Linking, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { useNotificationContext } from '../../context';
import { colors } from '../../themes';
import { auth, db } from '../../firebase';

interface RemindersProps {
  title: string;
  id: string;
}

export const Reminders: FC<RemindersProps> = ({ title, id }) => {
  const [time, setTime] = useState(new Date(1598051730000));
  const [remindersEnabled, setRemindersEnabled] = useState<boolean>();
  const [databaseValue, setDatabaseValue] = useState<boolean>();
  const user = auth.currentUser!;

  useEffect(() => {
    const settingsRef = db
      .collection('users')
      .doc(user.uid)
      .collection('settings')
      .doc(id);

    const getSettings = async () => {
      try {
        const settingsSnapshot = await settingsRef.get();
        if (!settingsSnapshot.exists) {
          setDatabaseValue(false);
        } else {
          const value = settingsSnapshot?.data()?.reminders;
          setDatabaseValue(value);
        }
      } catch ({ message }) {
        showNotification({ message, type: 'error' });
      }
    };
    getSettings();
  }, [setDatabaseValue]);

  const { showNotification } = useNotificationContext();

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((response) => {
      if (response.status === 'granted') {
        setRemindersEnabled(databaseValue);
      } else {
        setRemindersEnabled(false);
        onRemindersSubmit(false);
      }
    });
  }, [databaseValue]);

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
    const settingsRef = db
      .collection('users')
      .doc(user.uid)
      .collection('settings')
      .doc(id);
    try {
      await settingsRef.set({
        reminders: value,
        remindersTime: [],
      });
    } catch ({ message }) {
      showNotification({ message, type: 'error' });
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
