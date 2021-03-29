import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useState } from 'react';
import { Keyboard, View, ScrollView } from 'react-native';
import { Divider, List, Text } from 'react-native-paper';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  ErrorNotification,
  MainButton,
  SuccessNotification,
  DeleteAccountForm,
} from '../../components';
import { auth } from '../../firebase';
import { SettingsStackParamList } from '../../navigation/SettingsStack';
import {
  EditEmailFormData,
  EditPasswordFormData,
  EditUsernameFormData,
  DeleteAccountFormData,
} from '../../types';
import { useNotifySuccess } from '../../hooks';

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
  const [isAccountRemoval, setIsAccountRemoval] = useState(false);
  const [error, setError] = useState();
  const { message, isActive, openSuccess } = useNotifySuccess();

  const user = auth.currentUser!;

  const onSignOut = () => {
    auth.signOut();
  };

  const getCredentials = (password: string) => {
    return firebase.auth.EmailAuthProvider.credential(user.email!, password);
  };

  const handleUsernameSave = (data: EditUsernameFormData) => {
    Keyboard.dismiss();
    user
      .updateProfile({
        displayName: data.username,
      })
      .then(() => {
        openSuccess('Username updated successfully');
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
            openSuccess('E-mail updated successfully');
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsEmailInEdit(false));
  };

  const handlePasswordSave = (data: EditPasswordFormData) => {
    Keyboard.dismiss();
    user
      .reauthenticateWithCredential(getCredentials(data.oldPassword))
      .then(() => {
        user
          .updatePassword(data.password)
          .then(() => {
            openSuccess('Password updated successfully');
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

  const handleDelete = (data: DeleteAccountFormData) => {
    Keyboard.dismiss();
    user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user.delete().catch((error) => setError(error));
      });
  };

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 30,
          paddingVertical: 20,
          flex: 1,
        }}
      >
        <MainButton
          mode='text'
          onPress={onSignOut}
          text='Sign out'
          extraStyles={{ marginLeft: 'auto', marginBottom: 15 }}
        />
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
            closeForm={() => setIsPasswordInEdit(false)}
            handlePasswordSave={handlePasswordSave}
          />
        </List.Accordion>
        <Divider />
        <List.Accordion
          title='Remove account'
          expanded={isAccountRemoval}
          onPress={() => setIsAccountRemoval(!isAccountRemoval)}
        >
          <DeleteAccountForm
            closeForm={() => setIsAccountRemoval(false)}
            handleDelete={handleDelete}
          />
        </List.Accordion>
        <Divider />
      </ScrollView>
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
