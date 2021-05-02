import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { SettingsStackParamList } from '../../navigation/SettingsStack';

type MainSettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'MainSettings'
>;

type MainSettingsScreenProps = {
  navigation: MainSettingsScreenNavigationProp;
};

export const MainSettings: FC<MainSettingsScreenProps> = ({ navigation }) => {
  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 20,
        flex: 1,
      }}
    >
      <List.Section>
        <List.Item
          title='User settings'
          left={() => <List.Icon icon='folder' />}
          onPress={() => navigation.navigate('UserSettings')}
        />
        <List.Item
          title='App settings'
          left={() => <List.Icon color='#000' icon='folder' />}
          onPress={() => navigation.navigate('AppSettings')}
        />
      </List.Section>
    </View>
  );
};
