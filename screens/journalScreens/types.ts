import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { JournalStackParamList } from '../../navigation/JournalStack';

import { TabParamList } from '../../navigation/TabNavigation';

export type JournalType = {
  NO_ID_FIELD: string;
  content: string;
  title: string;
  createdAt: any; // TODO: change type
};

export type JournalFormDataType = {
  title: string;
  content: string;
};

// TODO: create generic type
export type JournalEntriesScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<JournalStackParamList, 'JournalEntries'>,
  BottomTabNavigationProp<TabParamList>
>;

export type NewJournalScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<JournalStackParamList, 'NewJournal'>,
  BottomTabNavigationProp<TabParamList>
>;

export type JournalEditScreenRouteProp = RouteProp<
  JournalStackParamList,
  'JournalEdit'
>;
export type JournalEditScreenNavigationProps = CompositeNavigationProp<
  StackNavigationProp<JournalStackParamList, 'JournalEdit'>,
  BottomTabNavigationProp<TabParamList>
>;
