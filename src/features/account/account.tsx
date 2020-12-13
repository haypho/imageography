import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Avatar, Button } from 'react-native-paper';
import { margin, padding } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: margin.medium,
  },
  content: {
    flex: 1,
  },
  avatar: {
    alignSelf: 'center',
  },
  actionButtonContent: {
    paddingVertical: padding.medium,
  },
});

const Account: React.FC = () => {
  const signOut = useCallback(() => auth().signOut(), []);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Account" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.content}>
          <Avatar.Icon icon="account" style={styles.avatar} />
        </View>
        <Button
          icon="logout"
          contentStyle={styles.actionButtonContent}
          onPress={signOut}>
          Sign Out
        </Button>
      </View>
    </>
  );
};

export default Account;
