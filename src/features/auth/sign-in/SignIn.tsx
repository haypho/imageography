import React, { useCallback, useRef, useState } from 'react';
import { Appbar, HelperText, TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';
import { displayNameCapitalized } from 'app.json';
import { StyleSheet, TextInput as TextInputType, View } from 'react-native';
import { MARGIN, PADDING } from '@app/constants';
import SignInActionArea from './SignInActionArea';

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
    borderWidth: 1,
  },
  actionButton: {
    paddingVertical: PADDING.medium,
  },
  actionButtonWrapper: {
    marginVertical: MARGIN.small,
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
    status,
    setStatus,
    validateField,
  } = useFormikContext<SignInFormValues>();

  const setEmail = useCallback(
    (email: string) => {
      setFieldValue('email', email);
      if (status) {
        setStatus(undefined);
      }
      if (errors.email) {
        validateField('email');
      }
    },
    [setFieldValue, status, setStatus, errors.email, validateField],
  );

  const setPassword = useCallback(
    (password: string) => {
      setFieldValue('password', password);
      if (status) {
        setStatus(undefined);
      }
      if (errors.password) {
        validateField('password');
      }
    },
    [setFieldValue, status, setStatus, errors.password, validateField],
  );

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
            error={errors.email || status}
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
            error={errors.password || status}
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
        </View>
        <SignInActionArea />
      </View>
    </>
  );
};

export default SignIn;
