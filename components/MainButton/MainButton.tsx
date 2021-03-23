import React, { FC } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    margin: 10,
    justifyContent: 'center',
  },
  containedButton: {
    height: 50,
  },
});

interface MainButtonProps {
  onPress: any;
  text: string;
  mode: 'contained' | 'outlined' | 'text';
}

export const MainButton: FC<MainButtonProps> = ({ onPress, text, mode }) => {
  const containedButton = mode === 'contained';
  const labelStyle = containedButton ? { color: 'white' } : null;
  return (
    <Button
      mode={mode}
      onPress={onPress}
      style={[styles.button, containedButton && styles.containedButton]}
      labelStyle={labelStyle}
    >
      {text}
    </Button>
  );
};
