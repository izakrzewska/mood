import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { FC, useEffect, useState } from 'react';
import { Button, ScrollView, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { Reminders } from '../../components';
import { AppSettingsScreenNavigationProp } from './types';

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
          <Reminders title='Journal' id='journals' />
          <Reminders title='Mood' id='moods' />
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
