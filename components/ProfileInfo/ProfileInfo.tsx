import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { UserNameController } from '../forms/components';
import { MainButton } from '../MainButton/MainButton';

interface ProfileInfoProps {
  text: string;
  onSave: any;
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
  onSave,
  children,
}) => {
  const [isInEdit, setIsInEdit] = useState<boolean>(false);

  return (
    <View style={styles.infoContainer}>
      {isInEdit ? (
        <>
          <View style={{ flexGrow: 1 }}>{children}</View>
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
