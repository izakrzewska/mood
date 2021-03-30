import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useReducer, useState } from 'react';
import { Keyboard, ScrollView, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  DeleteAccountForm,
  ErrorNotification,
  MainButton,
  SuccessNotification,
} from '../../components';
import { auth, db } from '../../firebase';
import { useNotifySuccess } from '../../hooks';
import { SettingsStackParamList } from '../../navigation/SettingsStack';
import {
  DeleteAccountFormData,
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

interface ProfileState {
  isUsernameinEdit: boolean;
  isEmailInEdit: boolean;
  isPasswordInEdit: boolean;
  isAccountRemoval: boolean;
}

const initialProfileState: ProfileState = {
  isUsernameinEdit: false,
  isEmailInEdit: false,
  isPasswordInEdit: false,
  isAccountRemoval: false,
};

const profileReducer = (state: ProfileState, action: any) => {
  switch (action.type) {
    case 'TOGGLE_USERNAME_EDIT':
      return {
        isUsernameinEdit: !state.isUsernameinEdit,
        isEmailInEdit: false,
        isPasswordInEdit: false,
        isAccountRemoval: false,
      };
    case 'TOGGLE_EMAIL_EDIT':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: !state.isEmailInEdit,
        isPasswordInEdit: false,
        isAccountRemoval: false,
      };
    case 'TOGGLE_PASSWORD_EDIT':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: false,
        isPasswordInEdit: !state.isPasswordInEdit,
        isAccountRemoval: false,
      };
    case 'TOGGLE_ACCOUNT_REMOVAL':
      return {
        isUsernameinEdit: false,
        isEmailInEdit: false,
        isPasswordInEdit: false,
        isAccountRemoval: !state.isAccountRemoval,
      };
    default:
      return state;
  }
};

export const Profile: FC<ProfileScreenProps> = ({ navigation }) => {
  const [state, dispatch] = useReducer(profileReducer, initialProfileState);
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
      .finally(() => dispatch({ type: 'TOGGLE_USERNAME_EDIT' }));
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
      .finally(() => dispatch({ type: 'TOGGLE_EMAIL_EDIT' }));
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
      .finally(() => dispatch({ type: 'TOGGLE_PASSWORD_EDIT' }));
  };

  const removeData = async () => {
    const collectionRef = db.collection('moods');
    // TODO: remove from journals too
    const query = collectionRef.where('belongsTo', '==', user.uid);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(query, resolve).catch(reject);
    });
  };

  const deleteQueryBatch = async (query: any, resolve: any) => {
    const snapshot = await query.get();
    const batch = db.batch();
    snapshot.docs.forEach((doc: any) => {
      batch.delete(doc.ref);
    });
    await batch.commit().then(() => {
      resolve();
    });
  };

  const handleDelete = (data: DeleteAccountFormData) => {
    Keyboard.dismiss();
    user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user
          .delete()
          .then(() => removeData())
          .catch((error) => setError(error));
      });
  };

  return (
    <>
      <ScrollView>
        <View
          style={{
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
            expanded={state.isUsernameinEdit}
            onPress={() => dispatch({ type: 'TOGGLE_USERNAME_EDIT' })}
          >
            <ChangeUsernameForm handleUsernameSave={handleUsernameSave} />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title='Edit e-email'
            expanded={state.isEmailInEdit}
            onPress={() => dispatch({ type: 'TOGGLE_EMAIL_EDIT' })}
          >
            <ChangeEmailForm handleEmailSave={handleEmaileSave} />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title='Edit password'
            expanded={state.isPasswordInEdit}
            onPress={() => dispatch({ type: 'TOGGLE_PASSWORD_EDIT' })}
          >
            <ChangePasswordForm handlePasswordSave={handlePasswordSave} />
          </List.Accordion>
          <Divider />
          <List.Accordion
            title='Remove account'
            expanded={state.isAccountRemoval}
            onPress={() => dispatch({ type: 'TOGGLE_ACCOUNT_REMOVAL' })}
          >
            <DeleteAccountForm handleDelete={handleDelete} />
          </List.Accordion>
          <Divider />
        </View>
      </ScrollView>
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
