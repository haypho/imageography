import auth from '@react-native-firebase/auth';
import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Appbar, Button } from 'react-native-paper';
import { margin, padding } from '../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: margin.medium,
  },
  content: {
    flex: 1,
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
        <View style={styles.content} />
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
