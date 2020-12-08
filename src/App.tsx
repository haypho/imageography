import React, { useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import BottomTabNavigator from './features/navigation/BottomTabNavigator';
import AuthStackNavigator from './features/navigation/AuthStackNavigator';

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
    return <AuthStackNavigator />;
  }

  return <BottomTabNavigator />;
};

export default App;
