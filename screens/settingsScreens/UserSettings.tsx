import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useState } from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { signOut } from '../../services/userService';
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
import { View } from 'react-native';

type UserSettingsScreenNavigationProp = StackNavigationProp<
  SettingsStackParamList,
  'UserSettings'
>;

type UserSettingsScreenProps = {
  navigation: UserSettingsScreenNavigationProp;
};

export const UserSettings: FC<UserSettingsScreenProps> = ({ navigation }) => {
  const [openId, setOpenId] = useState<string>();
  const [error, setError] = useState();
  const { message, isActive, openSuccess } = useNotifySuccess();

  const user = auth.currentUser!;

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
        setOpenId(undefined);
      })
      .catch((error) => {
        setError(error);
      });
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
            setOpenId(undefined);
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
    user
      .reauthenticateWithCredential(getCredentials(data.oldPassword))
      .then(() => {
        user
          .updatePassword(data.password)
          .then(() => {
            openSuccess('Password updated successfully');
            setOpenId(undefined);
          })
          .catch((error) => {
            setError(error);
          });
      })
      .catch((error) => {
        setError(error);
      });
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
            onPress={signOut}
            text='Sign out'
            extraStyles={{ marginLeft: 'auto', marginBottom: 15 }}
          />
          {accordionsData.map(({ id, buttonText, content }) => {
            const isAccordionOpen = id === openId;
            return (
              <View key={id}>
                <List.Accordion
                  id={id}
                  title={buttonText}
                  expanded={isAccordionOpen}
                  onPress={() => setOpenId(isAccordionOpen ? undefined : id)}
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
