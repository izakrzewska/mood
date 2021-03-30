import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NoDataImage } from '../images';

const styles = StyleSheet.create({
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const NoData = () => {
  return (
    <View style={styles.noDataContainer}>
      <NoDataImage />
    </View>
  );
};
