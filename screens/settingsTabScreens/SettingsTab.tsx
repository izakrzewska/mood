import React from 'react';
import { Text, View } from 'react-native';
import { MainButton } from '../../components';
import { auth } from '../../firebase';

export const SettingsTab = () => {
  const onSubmit = () => {
    auth.signOut();
  };

  return (
    <View>
      <View>
        <MainButton mode='outlined' onPress={onSubmit} text='Sign out' />
      </View>
    </View>
  );
};

export default SettingsTab;
