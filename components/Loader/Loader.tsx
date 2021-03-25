import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const Loader = () => {
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator animating size='large' />
    </View>
  );
};
