import { StackNavigationProp } from '@react-navigation/stack';
import firebase from 'firebase';
import React, { FC, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { ErrorNotification, MainButton, ProfileInfo } from '../../components';
import {
  EmailController,
  PasswordController,
  UserNameController,
} from '../../components/forms/components';
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
  const [error, setError] = useState();
  const user = auth.currentUser!;
  const onSubmit = () => {
    auth.signOut();
  };

  const {
    handleSubmit: handleUsernameSubmit,
    errors: userNameErrors,
    control: usernameControl,
  } = useForm<EditUsernameFormData>();
  const {
    handleSubmit: handleEmailSubmit,
    errors: emailErrors,
    control: emailControl,
  } = useForm<EditEmailFormData>();
  const {
    handleSubmit: handlePasswordSubmit,
    errors: passwordErros,
    control: passwordControl,
    watch: passwordWatch,
  } = useForm<EditPasswordFormData>();

  const password = useRef({});
  const currentPassword = (password.current = passwordWatch('password', ''));

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
        <ProfileInfo
          text={user.displayName as string}
          onSave={handleUsernameSubmit(handleUsernameSave)}
        >
          <UserNameController
            control={usernameControl}
            defaultValue={user.displayName!}
            error={userNameErrors.username}
          />
        </ProfileInfo>
        <ProfileInfo
          text={user.email as string}
          onSave={handleEmailSubmit(handleEmaileSave)}
        >
          <EmailController
            control={emailControl}
            defaultValue={user.email!}
            error={emailErrors.email}
          />
          <PasswordController
            label='Password'
            name='password'
            control={emailControl}
            error={emailErrors.password}
          />
        </ProfileInfo>
        <View>
          {isPasswordInEdit ? (
            <>
              <PasswordController
                label='Old password'
                name='oldPassword'
                control={passwordControl}
                error={passwordErros.oldPassword}
              />
              <PasswordController
                control={passwordControl}
                label='New password'
                name='password'
                error={passwordErros.password}
              />
              <PasswordController
                control={passwordControl}
                confirmation
                currentPassword={currentPassword}
                label='New password confirmation'
                name='passwordConf'
                error={passwordErros.passwordConf}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'flex-end',
                  marginTop: 10,
                }}
              >
                <MainButton
                  mode='text'
                  onPress={() => setIsPasswordInEdit(false)}
                  text='Close'
                />
                <MainButton
                  mode='text'
                  onPress={handlePasswordSubmit(handlePasswordSave)}
                  text='Save'
                />
              </View>
            </>
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
