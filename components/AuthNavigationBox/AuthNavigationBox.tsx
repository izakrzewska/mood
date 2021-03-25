import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { MainButton } from '../MainButton/MainButton';

const styles = StyleSheet.create({
  switchScreenText: {
    justifyContent: 'center',
    paddingTop: 20,
    paddingLeft: 10,
  },
  button: {
    marginTop: 15,
  },
});

interface AuthNavigationBoxProps {
  questionText: string;
  buttonText: string;
  onButtonPress: () => void;
}

export const AuthNavigationBox: FC<AuthNavigationBoxProps> = ({
  questionText,
  buttonText,
  onButtonPress,
}) => {
  return (
    <View>
      <View style={styles.switchScreenText}>
        <Text>{questionText}</Text>
      </View>
      <MainButton
        text={buttonText}
        mode='outlined'
        onPress={onButtonPress}
        extraStyles={styles.button}
      />
    </View>
  );
};
