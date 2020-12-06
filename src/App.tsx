import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import SignIn from './features/auth/sign-in';
import BottomTabs from './features/navigation/BottomTabs';

declare const global: { HermesInternal: null | {} };

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();

  const onAuthStateChangedHandler = useCallback(
    (user) => {
      setUser(user);
      if (initializing) {
        setInitializing(false);
      }
    },
    [setUser, setInitializing, initializing],
  );

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChangedHandler);
    return subscriber;
  }, [onAuthStateChangedHandler]);

  if (initializing) {
    // TODO: Change to splash screen
    return <ActivityIndicator />;
  }

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <BottomTabs />
    </>
  );
};

export default App;
