import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

export const Loader = () => {
  return (
    <View>
      <ActivityIndicator animating size='large' />
    </View>
  );
};
