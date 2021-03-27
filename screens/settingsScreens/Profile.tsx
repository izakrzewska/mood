import React, { FC } from 'react';
import { View } from 'react-native';
import { MainButton, ProfileInfo } from '../../components';
import { auth } from '../../firebase';
import { StackNavigationProp } from '@react-navigation/stack';
import { SettingsStackParamList } from '../../navigation/SettingsStack';

type ProfileScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Profile'
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const user = auth.currentUser!;
  const onSubmit = () => {
    auth.signOut();
  };

  return (
    <View
      style={{
        paddingHorizontal: 30,
        paddingVertical: 20,
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <ProfileInfo
        text={user.displayName as string}
        onSave={() => console.log('edit username')}
      />
      <ProfileInfo
        text={user.email as string}
        onSave={() => console.log('edit email')}
      />

      <MainButton
        mode='text'
        onPress={() => console.log('Edit password')}
        text='Change password'
        extraStyles={{
          alignSelf: 'flex-end',
          marginTop: 10,
        }}
      />
      <MainButton
        mode='outlined'
        onPress={onSubmit}
        text='Sign out'
        extraStyles={{ marginTop: 'auto' }}
      />
    </View>
  );
};
