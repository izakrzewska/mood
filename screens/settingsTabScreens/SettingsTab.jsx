import React from 'react';
import { Text, View } from 'react-native';
import { auth } from '../../firebase';
import { Button } from 'react-native-paper';

export const SettingsTab = () => {
  const onSubmit = () => {
    auth.signOut();
  };

  return (
    <View>
      <Text>Settings</Text>
      <View>
        <Button
          mode='contained'
          compact={false}
          onPress={onSubmit}
          icon='account-arrow-right'
        >
          Sign out
        </Button>
      </View>
    </View>
  );
};
export default SettingsTab;
