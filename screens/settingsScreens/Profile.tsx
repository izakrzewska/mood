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
  SuccessNotification,
} from '../../components';
import { auth } from '../../firebase';
import { SettingsStackParamList } from '../../navigation/SettingsStack';
import {
  EditEmailFormData,
  EditPasswordFormData,
  EditUsernameFormData,
} from '../../types';
import { Divider } from 'react-native-paper';

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
  const [hasSuccess, setHasSuccess] = useState(false);
  const [notificationText, setNotificationText] = useState('');
  const user = auth.currentUser!;
  const onSubmit = () => {
    auth.signOut();
  };

  const getCredentials = (password: string) => {
    return firebase.auth.EmailAuthProvider.credential(user.email!, password);
  };

  const handleUsernameSave = (data: EditUsernameFormData) => {
    setHasSuccess(false);
    Keyboard.dismiss();
    user
      .updateProfile({
        displayName: data.username,
      })
      .then(() => {
        setHasSuccess(true);
        setNotificationText('Username updated successfuly');
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsUsernameInEdit(false));
  };

  const handleEmaileSave = (data: EditEmailFormData) => {
    Keyboard.dismiss();
    user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user
          .updateEmail(data.email)
          .then(() => {
            setHasSuccess(true);
            setNotificationText('E-mail updated successfully');
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsUsernameInEdit(false));
  };

  const handlePasswordSave = (data: EditPasswordFormData) => {
    Keyboard.dismiss();
    user
      .reauthenticateWithCredential(getCredentials(data.oldPassword))
      .then(() => {
        user
          .updatePassword(data.password)
          .then(() => {
            setHasSuccess(true);
            setNotificationText('Password updated successfully');
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsPasswordInEdit(false));
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
            disabled={isEmailInEdit || isPasswordInEdit}
          />
        )}
        <Divider />
        {isEmailInEdit ? (
          <ChangeEmailForm
            closeForm={() => setIsEmailInEdit(false)}
            handleEmailSave={handleEmaileSave}
          />
        ) : (
          <ProfileInfo
            text={user.email as string}
            showForm={() => setIsEmailInEdit(true)}
            disabled={isUsernameinEdit || isPasswordInEdit}
          />
        )}
        <Divider />
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
              disabled={isUsernameinEdit || isEmailInEdit}
              text='Change password'
              extraStyles={{
                alignSelf: 'flex-end',
                marginTop: 10,
              }}
            />
          )}
          <MainButton
            mode='text'
            onPress={() => console.log('delete account')}
            disabled={isUsernameinEdit || isEmailInEdit || isPasswordInEdit}
            text='Remove account'
            extraStyles={{
              alignSelf: 'flex-end',
              marginTop: 10,
            }}
          />
        </View>
        <MainButton
          mode='outlined'
          onPress={onSubmit}
          text='Sign out'
          extraStyles={{ marginTop: 'auto' }}
        />
      </View>
      <ErrorNotification error={error} />
      <SuccessNotification
        success={hasSuccess}
        notificationText={notificationText}
      />
    </>
  );
};
