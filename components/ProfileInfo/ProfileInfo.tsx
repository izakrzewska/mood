import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { MainButton } from '../MainButton/MainButton';

interface ProfileInfoProps {
  text: string;
  onSave: () => void;
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

export const ProfileInfo: FC<ProfileInfoProps> = ({ text, onSave }) => {
  const [isInEdit, setIsInEdit] = useState<boolean>(false);

  return (
    <View style={styles.infoContainer}>
      {isInEdit ? (
        <>
          <Text style={styles.infoText}>Edit</Text>
          <MainButton
            mode='text'
            onPress={() => setIsInEdit(false)}
            text='Close'
          />
          <MainButton mode='text' onPress={onSave} text='Save' />
        </>
      ) : (
        <>
          <Text style={styles.infoText}>{text}</Text>
          <MainButton
            mode='text'
            onPress={() => setIsInEdit(true)}
            text='Edit'
          />
        </>
      )}
    </View>
  );
};
