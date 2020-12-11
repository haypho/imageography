import React, { useCallback, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import AuthStackNavigator from './navigation/AuthStackNavigator';
import { View, StyleSheet } from 'react-native';

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const [initializing, setInitializing] = useState<boolean>(true);
  const [user, setUser] = useState();

  const onAuthStateChangedHandler = useCallback(
    (newUser) => {
      setUser(newUser);
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
    return (
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return <AuthStackNavigator />;
  }

  return <BottomTabNavigator />;
};

export default App;
