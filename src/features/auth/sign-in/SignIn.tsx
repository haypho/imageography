import React, { useCallback } from 'react';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';
import { displayNameCapitalized } from '../../../../app.json';
import { Keyboard, StyleSheet, View } from 'react-native';
import { margin, padding } from '../../../constants/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: margin.large,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  actionArea: {
    flex: 1 / 3,
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingVertical: padding.medium,
  },
});

const SignIn: React.FC = () => {
  const {
    values,
    errors,
    setFieldValue,
    submitForm,
    isSubmitting,
    isValid,
  } = useFormikContext<SignInFormValues>();

  const setEmail = useCallback(
    (email: string) => setFieldValue('email', email),
    [setFieldValue],
  );
  const setPassword = useCallback(
    (password: string) => setFieldValue('password', password),
    [setFieldValue],
  );
  const signIn = useCallback(() => {
    Keyboard.dismiss();
    submitForm();
  }, [submitForm]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={displayNameCapitalized} />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            label="Email"
            placeholder="example@email.com"
            value={values.email}
            onChangeText={setEmail}
            error={!!errors.email}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
          <TextInput
            label="Password"
            value={values.password}
            onChangeText={setPassword}
            error={!!errors.password}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>
        <View style={styles.actionArea}>
          <Button
            onPress={signIn}
            mode="contained"
            contentStyle={styles.actionButton}
            disabled={!isValid || isSubmitting}>
            Sign In
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignIn;
