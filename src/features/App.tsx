import React, { useEffect } from 'react';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { ActivityIndicator } from 'react-native-paper';
import AuthStackNavigator from './navigation/auth/AuthStackNavigator';
import { View, StyleSheet } from 'react-native';
import BottomTabNavigator from './navigation/tabs/BottomTabNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { initializingSelector, userSelector } from '@app/store/selectors/signIn.selectors';
import { setInitializing, setUser } from '@app/store/slices/signIn.slice';

declare const global: { HermesInternal: null | {} };

const styles = StyleSheet.create({
  activityIndicatorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const App = () => {
  const dispatch = useDispatch();
  const user: FirebaseAuthTypes.User | null = useSelector(userSelector);
  const initializing: boolean = useSelector(initializingSelector);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((newUser) => {
      dispatch(setUser(newUser));
      dispatch(setInitializing(false));
    });
    return subscriber;
  }, [dispatch]);

  if (initializing) {
    // TODO: Change to splash screen
    return (
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (user?.emailVerified) {
    return <BottomTabNavigator />;
  }

  return <AuthStackNavigator />;
};

export default App;
