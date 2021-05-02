import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { FC, useState } from 'react';
import { Alert, Button, Linking, ScrollView, View } from 'react-native';
import { Switch, Text } from 'react-native-paper';
import { colors } from '../../themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../navigation/SettingsStack';

type AppSettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'AppSettings'
>;

type AppSettingsScreenProps = {
  navigation: AppSettingsScreenNavigationProp;
};

export const AppSettings: FC<AppSettingsScreenProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [time, setTime] = useState(new Date(1598051730000));

  const onChange = (event: any, selectedTime: any) => {
    const currentTime = selectedTime || time;
    setTime(currentTime);
  };

  const onNotificationPress = () => {
    Notifications.scheduleNotificationAsync({
      trigger: {
        seconds: 10,
      },
      content: {
        title: 'Rate your mood',
        body: 'Keep going',
      },
    });
  };

  const onNotificationsToggle = () => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((response) => {
        if (response.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return response;
      })
      .then((response) => {
        if (response?.status !== 'granted') {
          Alert.alert(
            'Allow notifications',
            'Enable notifications to be able to get reminders',
            [
              {
                text: 'Close',
                style: 'default',
                onPress: () => console.log('elo'),
              },
              {
                text: 'Open settings',
                style: 'default',
                onPress: () => Linking.openSettings(),
              },
            ]
          );
          return;
        }
      });
  };
  return (
    <>
      <ScrollView>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 20,
            flex: 1,
          }}
        >
          <Text>App settings</Text>
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
            <Button title='local notification' onPress={onNotificationPress} />
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
        </View>
      </ScrollView>
    </>
  );
};
