import React, { FC } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FieldError } from 'react-hook-form';

const styles = StyleSheet.create({
  errorContainer: {
    marginLeft: 10,
  },
  errorMessage: {
    color: '#EE6364',
  },
});

interface FormErrorProps {
  error?: FieldError;
}

export const FormError: FC<FormErrorProps> = ({ error }) => {
  return (
    <View style={styles.errorContainer}>
      {error && <Text style={styles.errorMessage}>{error.message}</Text>}
    </View>
  );
};
