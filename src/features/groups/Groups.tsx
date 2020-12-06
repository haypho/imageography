import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Groups: React.FC = () => {
  const signOut = () => auth().signOut();

  return (
    <View>
      <Text>Groups</Text>
      <Button onPress={signOut}>Sign Out</Button>
    </View>
  );
};

export default Groups;
