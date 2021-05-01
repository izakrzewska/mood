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
  RemindersForm,
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
import { profileReducer, initialProfileState } from '../../reducers';

type ProfileScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'Profile'
>;

type ProfileScreenProps = {
  navigation: ProfileScreenNavigationProp;
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
      .finally(() =>
        dispatch({
          type: 'SET_OPEN',
          payload: undefined,
        })
      );
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
      .finally(() =>
        dispatch({
          type: 'SET_OPEN',
          payload: undefined,
        })
      );
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
      .finally(() =>
        dispatch({
          type: 'SET_OPEN',
          payload: undefined,
        })
      );
  };

  const removeData = async () => {
    const moodsRef = db.collection('moods');
    // TODO: remove from journals too
    const query = moodsRef.where('belongsTo', '==', user.uid);

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

  const accordionsData = [
    {
      id: 'username',
      buttonText: 'Edit username',
      content: <ChangeUsernameForm handleUsernameSave={handleUsernameSave} />,
    },
    {
      id: 'email',
      buttonText: 'Edit e-email',
      content: <ChangeEmailForm handleEmailSave={handleEmaileSave} />,
    },
    {
      id: 'password',
      buttonText: 'Edit password',
      content: <ChangePasswordForm handlePasswordSave={handlePasswordSave} />,
    },
    {
      id: 'removal',
      buttonText: 'Remove account',
      content: <DeleteAccountForm handleDelete={handleDelete} />,
    },
    {
      id: 'reminders',
      buttonText: 'Reminders',
      content: <RemindersForm />,
    },
  ];

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
          {accordionsData.map(({ id, buttonText, content }) => {
            const isAccordionOpen = id === state.openId;
            return (
              <View key={id}>
                <List.Accordion
                  id={id}
                  title={buttonText}
                  expanded={isAccordionOpen}
                  onPress={() =>
                    dispatch({
                      type: 'SET_OPEN',
                      payload: isAccordionOpen ? undefined : id,
                    })
                  }
                >
                  {content}
                </List.Accordion>
                <Divider />
              </View>
            );
          })}
        </View>
      </ScrollView>
      <ErrorNotification error={error} />
      <SuccessNotification success={isActive} notificationText={message} />
    </>
  );
};
