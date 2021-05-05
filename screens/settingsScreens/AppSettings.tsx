import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { FC, useState, useEffect } from 'react';
import { Alert, Button, Linking, ScrollView, View } from 'react-native';
import { Switch, Text, List, Divider, Chip } from 'react-native-paper';
import { colors } from '../../themes';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../navigation/SettingsStack';
import { Reminders } from '../../components';

type AppSettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'AppSettings'
>;

type AppSettingsScreenProps = {
  navigation: AppSettingsScreenNavigationProp;
};

export const AppSettings: FC<AppSettingsScreenProps> = ({ navigation }) => {
  const [openId, setOpenId] = useState<string>();

  useEffect(() => {
    Permissions.getAsync(Permissions.NOTIFICATIONS)
      .then((response) => {
        if (response.status !== 'granted') {
          return Permissions.askAsync(Permissions.NOTIFICATIONS);
        }
        return response;
      })
      .then((response) => {
        if (response?.status !== 'granted') {
          return;
        }
      });
  }, []);

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

  const accordionsData = [
    {
      id: 'reminders',
      buttonText: 'Reminders',
      content: (
        <View>
          <Reminders title='Journal' />
          <Reminders title='Mood' />
        </View>
      ),
    },
  ];

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
          {accordionsData.map(({ id, buttonText, content }) => {
            const isAccordionOpen = id === openId;
            return (
              <View key={id}>
                <List.Accordion
                  id={id}
                  title={buttonText}
                  expanded={isAccordionOpen}
                  onPress={() => setOpenId(isAccordionOpen ? undefined : id)}
                >
                  {content}
                </List.Accordion>
                <Divider />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View>
        <Button title='local notification' onPress={onNotificationPress} />
      </View>
    </>
  );
};
