import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { FC } from 'react';
import { TabNavigation } from './TabNavigation';
import { UserManagementStackNavigation } from './UserManagementStackNavigation';

interface MainNavigationContainerProps {
  signedIn: boolean;
}

export const MainNavigationContainer: FC<MainNavigationContainerProps> = ({
  signedIn,
}) => {
  return (
    <NavigationContainer theme={DefaultTheme}>
      {signedIn ? <TabNavigation /> : <UserManagementStackNavigation />}
    </NavigationContainer>
  );
};
