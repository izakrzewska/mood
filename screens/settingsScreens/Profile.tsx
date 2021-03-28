import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useState } from 'react';
import { Keyboard, View } from 'react-native';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  ErrorNotification,
  MainButton,
  ProfileInfo,
} from '../../components';
import { auth } from '../../firebase';
import { SettingsStackParamList } from '../../navigation/SettingsStack';
import {
  EditEmailFormData,
  EditPasswordFormData,
  EditUsernameFormData,
} from '../../types';

type ProfileScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Profile'
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
};

export const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const [isPasswordInEdit, setIsPasswordInEdit] = useState(false);
  const [isUsernameinEdit, setIsUsernameInEdit] = useState(false);
  const [isEmailInEdit, setIsEmailInEdit] = useState(false);
  const [error, setError] = useState();
  const user = auth.currentUser!;
  const onSubmit = () => {
    auth.signOut();
  };

  const handleUsernameSave = (data: EditUsernameFormData) => {
    user
      .updateProfile({
        displayName: data.username,
      })
      .then(() => {
        navigation.replace('Profile');
        // TODO: add success notification
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handleEmaileSave = (data: EditEmailFormData) => {
    Keyboard.dismiss();
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email!,
      data.password
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updateEmail(data.email)
          .then(() => {
            navigation.replace('Profile');
            // TODO: add success notification
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };

  const handlePasswordSave = (data: EditPasswordFormData) => {
    Keyboard.dismiss();
    var credential = firebase.auth.EmailAuthProvider.credential(
      user.email!,
      data.oldPassword
    );
    user
      .reauthenticateWithCredential(credential)
      .then(() => {
        user
          .updatePassword(data.password)
          .then(() => {
            navigation.replace('Profile');
            // TODO: add success notification
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
  };
  return (
    <>
      <View
        style={{
          paddingHorizontal: 30,
          paddingVertical: 20,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {isUsernameinEdit ? (
          <ChangeUsernameForm
            closeForm={() => setIsUsernameInEdit(false)}
            handleUsernameSave={handleUsernameSave}
          />
        ) : (
          <ProfileInfo
            text={user.displayName as string}
            showForm={() => setIsUsernameInEdit(true)}
          />
        )}
        {isEmailInEdit ? (
          <ChangeEmailForm
            closeForm={() => setIsEmailInEdit(false)}
            handleEmailSave={handleEmaileSave}
          />
        ) : (
          <ProfileInfo
            text={user.email as string}
            showForm={() => setIsEmailInEdit(true)}
          />
        )}
        <View>
          {isPasswordInEdit ? (
            <ChangePasswordForm
              closeEdit={() => setIsPasswordInEdit(false)}
              handlePasswordSave={handlePasswordSave}
            />
          ) : (
            <MainButton
              mode='text'
              onPress={() => setIsPasswordInEdit(true)}
              text='Change password'
              extraStyles={{
                alignSelf: 'flex-end',
                marginTop: 10,
              }}
            />
          )}
        </View>
        <MainButton
          mode='outlined'
          onPress={onSubmit}
          text='Sign out'
          extraStyles={{ marginTop: 'auto' }}
        />
      </View>
      <ErrorNotification error={error} />
    </>
  );
};
