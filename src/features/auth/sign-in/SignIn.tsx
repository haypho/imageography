import React, { useCallback, useRef, useState } from 'react';
import { Appbar, Button, HelperText, TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';
import { displayNameCapitalized } from '../../../../app.json';
import {
  Keyboard,
  StyleSheet,
  TextInput as TextInputType,
  View,
} from 'react-native';
import { MARGIN, PADDING } from '../../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.large,
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
    paddingVertical: PADDING.medium,
  },
  error: {
    textAlign: 'center',
    fontSize: 16,
  },
});

const SignIn: React.FC = () => {
  const passwordRef = useRef<TextInputType>(null);
  const [useSecureEntry, setUseSecureEntry] = useState<boolean>(true);
  const {
    values,
    errors,
    setFieldValue,
    submitForm,
    isSubmitting,
    isValid,
    status,
    setStatus,
  } = useFormikContext<SignInFormValues>();

  const setEmail = useCallback(
    (email: string) => {
      setFieldValue('email', email);
      if (status) {
        setStatus(undefined);
      }
    },
    [setFieldValue, status, setStatus],
  );

  const setPassword = useCallback(
    (password: string) => {
      setFieldValue('password', password);
      if (status) {
        setStatus(undefined);
      }
    },
    [setFieldValue, status, setStatus],
  );

  const signIn = useCallback(() => {
    Keyboard.dismiss();
    submitForm();
  }, [submitForm]);

  const toggleSecureEntry = useCallback(() => {
    setUseSecureEntry(!useSecureEntry);
  }, [setUseSecureEntry, useSecureEntry]);

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
            keyboardType="email-address"
            autoCompleteType="email"
            returnKeyType="next"
            onSubmitEditing={(): void => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
          <TextInput
            label="Password"
            value={values.password}
            onChangeText={setPassword}
            error={!!errors.password}
            secureTextEntry={useSecureEntry}
            onBlur={() => setUseSecureEntry(true)}
            ref={passwordRef}
            right={
              <TextInput.Icon
                name={useSecureEntry ? 'eye-off-outline' : 'eye-outline'}
                onPress={toggleSecureEntry}
              />
            }
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
          <HelperText type="error" visible={!!status} style={styles.error}>
            Invalid Credentials
          </HelperText>
        </View>
        <View style={styles.actionArea}>
          <Button
            onPress={signIn}
            mode="contained"
            contentStyle={styles.actionButton}
            disabled={!isValid || isSubmitting}
            loading={isSubmitting}>
            Sign In
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignIn;
