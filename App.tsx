import React, { useState } from 'react';
import { Loader } from './components/';
import { auth } from './firebase';
import { MainNavigationContainer } from './navigation';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#A37774',
    },
  };

  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
    setIsLoading(false);
  });

  return (
    <PaperProvider theme={theme}>
      {isLoading ? <Loader /> : <MainNavigationContainer signedIn={signedIn} />}
    </PaperProvider>
  );
}
