import React from 'react';
import { Button, Appbar } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

const Groups: React.FC = () => {
  const signOut = () => auth().signOut();

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      <Button onPress={signOut}>Sign Out</Button>
    </>
  );
};

export default Groups;
