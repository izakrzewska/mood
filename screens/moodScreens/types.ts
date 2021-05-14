import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { MoodStackParamList } from '../../navigation/MoodStack';

import { TabParamList } from '../../navigation/TabNavigation';

export type MoodFormData = {
  value: number;
};

export type Mood = {
  value: number;
  id: string;
  createdAt: any; // TODO: add type
};

// TODO: create generic type
export type NewMoodScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoodStackParamList, 'NewMood'>,
  BottomTabNavigationProp<TabParamList>
>;

export type MoodStatisticsScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoodStackParamList, 'MoodsStatistics'>,
  BottomTabNavigationProp<TabParamList>
>;

export type HistoryScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoodStackParamList, 'History'>,
  BottomTabNavigationProp<TabParamList>
>;

export type EditMoodScreenRouteProp = RouteProp<
  MoodStackParamList,
  'EditMoodDetails'
>;
export type EditMoodScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<MoodStackParamList, 'EditMoodDetails'>,
  BottomTabNavigationProp<TabParamList>
>;
