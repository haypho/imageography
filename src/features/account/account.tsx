import React from 'react';
import { Appbar, Text } from 'react-native-paper';

const Account: React.FC = () => {
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Account" />
      </Appbar.Header>
      <Text>Account</Text>
    </>
  );
};

export default Account;
