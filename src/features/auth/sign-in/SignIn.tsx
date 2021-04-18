import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Appbar, HelperText, TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';
import { displayNameCapitalized } from 'app.json';
import {
  StyleSheet,
  TextInput as TextInputType,
  View,
  Keyboard,
} from 'react-native';
import { MARGIN } from '@app/constants';
import SignInActionArea from './SignInActionArea';
import SignInBanner from './SignInBanner';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN.large,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
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
    submitForm,
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

  const [actionAreaVisible, setActionAreaVisible] = useState<boolean>(true);

  useEffect(() => {
    const keyboardShowSub = Keyboard.addListener('keyboardDidShow', () => {
      setActionAreaVisible(false);
    });
    const keyboardHideSub = Keyboard.addListener('keyboardDidHide', () => {
      setActionAreaVisible(true);
    });

    return () => {
      Keyboard.removeSubscription(keyboardShowSub);
      Keyboard.removeSubscription(keyboardHideSub);
    };
  }, [setActionAreaVisible]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={displayNameCapitalized} />
      </Appbar.Header>
      <SignInBanner />
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
            onSubmitEditing={() => {
              Keyboard.dismiss();
              submitForm();
            }}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
        </View>
        {actionAreaVisible && <SignInActionArea />}
      </View>
    </>
  );
};

export default SignIn;
