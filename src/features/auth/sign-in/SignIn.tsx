import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const SignIn: React.FC = () => {
  const email = 'hphothong@gmail.com';
  const password = 'password1';
  const signIn = () => auth().signInWithEmailAndPassword(email, password);

  return (
    <View>
      <Button onPress={signIn}>Sign In</Button>
    </View>
  );
};

export default SignIn;
