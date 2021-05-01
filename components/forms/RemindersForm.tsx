import DateTimePicker from '@react-native-community/datetimepicker';
import Constants from 'expo-constants';
import React, { FC, useState } from 'react';
import { Button, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { colors } from '../../themes';

interface RemindersFormProps {}

export const RemindersForm: FC<RemindersFormProps> = ({}) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [time, setTime] = useState(new Date(1598051730000));

  const onChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const onNotificationsToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // ask for permissions here
  };

  return (
    <View>
      <View
        style={{
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text>Enable notifications</Text>
        <Switch
          color={colors.main}
          value={notificationsEnabled}
          onValueChange={onNotificationsToggle}
        />
      </View>
      {notificationsEnabled && (
        <View>
          <Text>Rate mood reminder</Text>
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
