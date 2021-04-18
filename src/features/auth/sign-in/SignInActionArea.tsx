import { useNavigation } from '@react-navigation/core';
import React, { useCallback } from 'react';
import { Button } from 'react-native-paper';
import { StyleSheet, Keyboard } from 'react-native';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';
import { MARGIN, PADDING } from '@app/constants';

const styles = StyleSheet.create({
  buttonWrapper: {
    marginVertical: MARGIN.small,
  },
  button: {
    paddingVertical: PADDING.medium,
  },
});

const SignInActionArea: React.FC = () => {
  const {
    isValid,
    isSubmitting,
    submitForm,
  } = useFormikContext<SignInFormValues>();
  const navigation = useNavigation();
  const signIn = useCallback(() => {
    Keyboard.dismiss();
    submitForm();
  }, [submitForm]);
  const signUp = useCallback(() => navigation.navigate('SignUp'), [navigation]);
  const onPressForgotPassword = useCallback(
    () => navigation.navigate('ForgotPassword'),
    [navigation],
  );

  return (
    <>
      <Button
        onPress={signIn}
        mode="contained"
        contentStyle={styles.button}
        style={styles.buttonWrapper}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}>
        Sign In
      </Button>
      <Button
        onPress={signUp}
        mode="outlined"
        contentStyle={styles.button}
        style={styles.buttonWrapper}>
        Sign Up
      </Button>
      <Button
        style={styles.buttonWrapper}
        contentStyle={styles.button}
        mode="text"
        onPress={onPressForgotPassword}>
        Forgot Password
      </Button>
    </>
  );
};

export default SignInActionArea;
