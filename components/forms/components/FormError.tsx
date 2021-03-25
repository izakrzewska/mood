import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { FieldError } from 'react-hook-form';
import { colors } from '../../../themes';

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 10,
  },
});

interface FormErrorProps {
  error?: FieldError;
}

export const FormError: FC<FormErrorProps> = ({ error }) => {
  return (
    <View style={styles.errorContainer}>
      {error && (
        <Text theme={{ colors: { text: colors.error } }}>{error.message}</Text>
      )}
    </View>
  );
};
