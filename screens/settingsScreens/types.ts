import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../navigation/SettingsStack';

import { TabParamList } from '../../navigation/TabNavigation';

// TODO: create generic type
export type AppSettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'AppSettings'>,
  BottomTabNavigationProp<TabParamList>
>;

export type MainSettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'MainSettings'>,
  BottomTabNavigationProp<TabParamList>
>;

export type UserSettingsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'UserSettings'>,
  BottomTabNavigationProp<TabParamList>
>;
