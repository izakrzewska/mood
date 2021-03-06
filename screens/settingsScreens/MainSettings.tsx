import React, { FC } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';
import { colors } from '../../themes';
import { MainSettingsScreenNavigationProp } from './types';

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
          left={() => <List.Icon color={colors.main} icon='account' />}
          right={() => <List.Icon icon='chevron-right' />}
          onPress={() => navigation.navigate('UserSettings')}
        />
        <List.Item
          title='App settings'
          left={() => <List.Icon color={colors.main} icon='cog' />}
          right={() => <List.Icon icon='chevron-right' />}
          onPress={() => navigation.navigate('AppSettings')}
        />
      </List.Section>
    </View>
  );
};
