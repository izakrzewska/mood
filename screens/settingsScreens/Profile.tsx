import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useState } from 'react';
import { Keyboard, View, ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  ErrorNotification,
  MainButton,
  SuccessNotification,
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
  const [hasSuccess, setHasSuccess] = useState(false);
  const [notificationText, setNotificationText] = useState('');

  const user = auth.currentUser!;

  const onSignOut = () => {
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
    setHasSuccess(false);
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
    setHasSuccess(false);
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
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingVertical: 20,
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <List.Accordion
          title='Edit username'
          expanded={isUsernameinEdit}
          onPress={() => setIsUsernameInEdit(!isUsernameinEdit)}
        >
          <ChangeUsernameForm
            closeForm={() => setIsUsernameInEdit(false)}
            handleUsernameSave={handleUsernameSave}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='Edit e-email'
          expanded={isEmailInEdit}
          onPress={() => setIsEmailInEdit(!isEmailInEdit)}
        >
          <ChangeEmailForm
            closeForm={() => setIsEmailInEdit(false)}
            handleEmailSave={handleEmaileSave}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='Edit password'
          expanded={isPasswordInEdit}
          onPress={() => setIsPasswordInEdit(!isPasswordInEdit)}
        >
          <ChangePasswordForm
            closeEdit={() => setIsPasswordInEdit(false)}
            handlePasswordSave={handlePasswordSave}
          />
        </List.Accordion>
        <Divider />
        {/* <MainButton
          mode='text'
          onPress={() => console.log('delete account')}
          text='Remove account'
          extraStyles={{
            alignSelf: 'flex-end',
            marginTop: 10,
          }}
        /> */}
        <MainButton
          mode='outlined'
          onPress={onSignOut}
          text='Sign out'
          extraStyles={{ marginTop: 'auto' }}
        />
      </ScrollView>
      <ErrorNotification error={error} />
      <SuccessNotification
        success={hasSuccess}
        notificationText={notificationText}
      />
    </>
  );
};
