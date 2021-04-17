import React, { useCallback } from 'react';
import { Appbar, Button, Subheading } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, View } from 'react-native';
import { MARGIN, PADDING } from '@app/constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: MARGIN.large,
  },
  prompt: {
    textAlign: 'center',
    marginVertical: MARGIN.large,
  },
  buttonWrapper: {
    marginVertical: MARGIN.large,
  },
  button: {
    paddingVertical: PADDING.small,
  },
});

const EmailVerification: React.FC = () => {
  const navigation = useNavigation();
  const onPressBack = useCallback(() => {
    auth()
      .signOut()
      .finally(() => navigation.navigate('SignIn'));
  }, [navigation]);

  const onPressSendAgain = useCallback(() => {
    auth().currentUser?.sendEmailVerification();
  }, []);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={onPressBack} />
        <Appbar.Content title="Verify Email Address" />
      </Appbar.Header>
      <View style={styles.container}>
        <Subheading style={styles.prompt}>
          A verification email has been sent to you. You must verify your email
          address before continuing.
        </Subheading>
        <Button
          mode="contained"
          style={styles.buttonWrapper}
          contentStyle={styles.button}
          onPress={onPressBack}>
          Okay
        </Button>
        <Button
          mode="text"
          contentStyle={styles.button}
          icon="email"
          onPress={onPressSendAgain}>
          Send Again
        </Button>
      </View>
    </>
  );
};

export default EmailVerification;
