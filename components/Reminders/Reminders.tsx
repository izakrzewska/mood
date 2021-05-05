import React, { FC, useState, useEffect } from 'react';
import { View, Button, Alert, Linking } from 'react-native';
import { Text, Chip, Switch } from 'react-native-paper';
import { auth, db } from '../../firebase';
import { colors } from '../../themes';
import * as Notifications from 'expo-notifications';
import { ErrorNotification } from '../ErrorNotification/ErrorNotification';
import * as Permissions from 'expo-permissions';
import { IError } from '../../types';
import DateTimePicker from '@react-native-community/datetimepicker';

interface RemindersProps {
  title: string;
}

export const Reminders: FC<RemindersProps> = ({ title }) => {
  const user = auth.currentUser!;
  const [error, setError] = useState<IError>();
  const [time, setTime] = useState(new Date(1598051730000));

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS).then((response) => {
      if (response.status === 'granted') {
        const getSetting = async () => {
          const userSettings = db.collection('users').doc(user.uid);
          const doc = await userSettings.get();
          if (!doc.exists) {
            setRemindersEnabled(false);
          } else {
            setRemindersEnabled(doc.data()?.[`${title}Reminders`]);
          }
        };
        getSetting();
      } else {
        setRemindersEnabled(false);
        onRemindersSubmit(false);
      }
    });
  }, []);

  const [remindersEnabled, setRemindersEnabled] = useState<boolean>();

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
      const ref = db.collection('users');
      await ref.doc(user.uid).set(
        {
          [`${title}Reminders`]: value,
        },
        {
          mergeFields: [`${title}Reminders`],
        }
      );
    } catch (error) {
      setError(error);
    }
  };

  const onChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  return (
    <>
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
      <ErrorNotification error={error} />
    </>
  );
};
