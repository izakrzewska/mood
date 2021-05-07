import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserManagementStackParamList } from '../../navigation/UserManagementStack';

import { TabParamList } from '../../navigation/TabNavigation';

// TODO: create generic type
export type LoginScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<UserManagementStackParamList, 'Login'>,
  BottomTabNavigationProp<TabParamList>
>;

export type RegisterScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<UserManagementStackParamList, 'Register'>,
  BottomTabNavigationProp<TabParamList>
>;

export type ResetPasswordScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<UserManagementStackParamList, 'ResetPassword'>,
  BottomTabNavigationProp<TabParamList>
>;

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegisterFormData = {
  email: string;
  password: string;
  username: string;
  passwordConf: string;
};

export type ResetPasswordFormData = {
  email: string;
};
