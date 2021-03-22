import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Loader } from './components/';
import { auth } from './firebase';
import { MainNavigationContainer } from './navigation';

export default function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  auth.onAuthStateChanged((user: any) => {
    if (user) {
      setSignedIn(true);
    } else {
      setSignedIn(false);
    }
    setIsLoading(false);
  });

  return isLoading ? (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <Loader />
    </SafeAreaView>
  ) : (
    <MainNavigationContainer signedIn={signedIn} />
  );
}
