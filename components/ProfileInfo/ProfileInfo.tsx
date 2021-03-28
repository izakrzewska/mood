import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserNameController } from '../forms/components';
import { MainButton } from '../MainButton/MainButton';

interface ProfileInfoProps {
  text: string;
  showForm: () => void;
  disabled: boolean;
}

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: 'row',
  },
  infoText: {
    flexGrow: 1,
    justifyContent: 'center',
    marginVertical: 10,
  },
});

export const ProfileInfo: FC<ProfileInfoProps> = ({
  text,
  showForm,
  disabled,
}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.infoText}>{text}</Text>
      <MainButton
        mode='text'
        onPress={showForm}
        text='Edit'
        disabled={disabled}
      />
    </View>
  );
};
