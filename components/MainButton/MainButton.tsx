import React, { FC } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
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
  extraStyles?: any;
  disabled?: boolean;
}

export const MainButton: FC<MainButtonProps> = ({
  onPress,
  text,
  mode,
  extraStyles,
  disabled = false,
}) => {
  const containedButton = mode === 'contained';
  const labelStyle = containedButton ? { color: 'white' } : null;
  return (
    <Button
      disabled={disabled}
      mode={mode}
      onPress={onPress}
      style={[
        styles.button,
        containedButton && styles.containedButton,
        extraStyles && { ...extraStyles },
      ]}
      labelStyle={labelStyle}
    >
      {text}
    </Button>
  );
};
