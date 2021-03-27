import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { MainButton } from '../../components';
import { auth } from '../../firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsdStackParamList } from '../../navigation/SettingsStack';

type ProfileScreenNavigationProp = StackNavigationProp<
  SettingsdStackParamList,
  'Profile'
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const onSubmit = () => {
    auth.signOut();
  };
  return (
    <View>
      <Text>Profile</Text>
      <View>
        <MainButton mode='outlined' onPress={onSubmit} text='Sign out' />
      </View>
    </View>
  );
};
