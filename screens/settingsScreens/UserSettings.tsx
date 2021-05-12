import firebase from 'firebase/app';
import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useAuth, useUser } from 'reactfire';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  DeleteAccountForm,
  MainButton,
} from '../../components';
import { useNotificationContext } from '../../context';
import {
  DeleteAccountFormData,
  EditEmailFormData,
  EditPasswordFormData,
  EditUsernameFormData,
} from '../../types';
import { UserSettingsScreenNavigationProp } from './types';

type UserSettingsScreenProps = {
  navigation: UserSettingsScreenNavigationProp;
};

export const UserSettings: FC<UserSettingsScreenProps> = ({ navigation }) => {
  const auth = useAuth();
  const { showNotification } = useNotificationContext();
  const { data: user } = useUser();
  const [openId, setOpenId] = useState<string>();

  const getCredentials = (password: string) => {
    return firebase.auth.EmailAuthProvider.credential(user.email!, password);
  };

  const handleUsernameSave = async (data: EditUsernameFormData) => {
    try {
      await user.updateProfile({ displayName: data.username }).then(() => {
        showNotification('Username updated', 'success');
        setOpenId(undefined);
      });
    } catch ({ message }) {
      showNotification(message, 'error');
    }
  };

  const handleEmaileSave = (data: EditEmailFormData) => {
    user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user
          .updateEmail(data.email)
          .then(() => {
            showNotification('E-mail updated', 'success');
            setOpenId(undefined);
          })
          .catch(({ message }) => {
            showNotification(message, 'error');
          });
      })
      .catch(({ message }) => {
        showNotification(message, 'error');
      });
  };

  const handlePasswordSave = (data: EditPasswordFormData) => {
    user
      .reauthenticateWithCredential(getCredentials(data.oldPassword))
      .then(() => {
        user
          .updatePassword(data.password)
          .then(() => {
            showNotification('Password updated', 'success');
            setOpenId(undefined);
          })
          .catch(({ message }) => {
            showNotification(message, 'error');
          });
      })
      .catch(({ message }) => {
        showNotification(message, 'error');
      });
  };

  const handleDelete = (data: DeleteAccountFormData) => {
    user
      .reauthenticateWithCredential(getCredentials(data.password))
      .then(() => {
        user
          .delete()
          .then(() => {
            // TODO: remove user data
          })
          .catch(({ message }) => {
            showNotification(message, 'error');
          });
      })
      .catch(({ message }) => showNotification(message, 'error'));
  };

  const accordionsData = [
    {
      id: 'username',
      buttonText: 'Edit username',
      content: (
        <ChangeUsernameForm
          displayName={user.displayName}
          handleUsernameSave={handleUsernameSave}
        />
      ),
    },
    {
      id: 'email',
      buttonText: 'Edit e-email',
      content: (
        <ChangeEmailForm
          email={user.email as string}
          handleEmailSave={handleEmaileSave}
        />
      ),
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
          onPress={() => auth.signOut()}
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
  );
};
