import React, { FC, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { auth } from '../../firebase';
import {
  ChangeEmailForm,
  ChangePasswordForm,
  ChangeUsernameForm,
  DeleteAccountForm,
  MainButton,
} from '../../components';
import { useNotificationContext } from '../../context';
import {
  deleteAccount,
  updateEmail,
  updatePassword,
  updateUsername,
} from '../../reducers/user/userReducer';
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
  const { showNotification } = useNotificationContext();
  const [openId, setOpenId] = useState<string>();
  const user = auth.currentUser!;

  const handleUsernameSave = (data: EditUsernameFormData) => {
    updateUsername(data, showNotification).then(() => setOpenId(undefined));
  };

  const handleEmaileSave = (data: EditEmailFormData) => {
    updateEmail(data, showNotification).then(() => setOpenId(undefined));
  };

  const handlePasswordSave = (data: EditPasswordFormData) => {
    updatePassword(data, showNotification).then(() => setOpenId(undefined));
  };

  const handleDelete = (data: DeleteAccountFormData) => {
    deleteAccount(data, showNotification);
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
