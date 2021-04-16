import { useNavigation } from '@react-navigation/core';
import React, { useCallback, useRef } from 'react';
import {
  Appbar,
  Button,
  HelperText,
  TextInput,
  useTheme,
} from 'react-native-paper';
import {
  Keyboard,
  StyleSheet,
  View,
  TextInput as TextInputType,
} from 'react-native';
import { MARGIN, PADDING } from '@app/constants';
import { useFormikContext } from 'formik';
import { SignUpFormValues } from './signUp.validation';
import SecuredTextInput from '@app/components/secured-text-input';

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
  buttonWrapper: {
    marginVertical: MARGIN.small,
  },
  button: {
    paddingVertical: PADDING.medium,
  },
});

const SignUp: React.FC = () => {
  const {
    values,
    setFieldValue,
    errors,
    submitForm,
  } = useFormikContext<SignUpFormValues>();
  const emailRef = useRef<TextInputType>(null);
  const passwordRef = useRef<TextInputType>(null);
  const confirmPasswordRef = useRef<TextInputType>(null);
  const theme = useTheme();
  const navigation = useNavigation();
  const onPressBack = useCallback(() => navigation.goBack(), [navigation]);
  const onSubmit = useCallback(() => {
    Keyboard.dismiss();
    submitForm();
  }, [submitForm]);

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={onPressBack} />
        <Appbar.Content title="Sign Up" />
      </Appbar.Header>
      <View style={styles.container}>
        <View style={styles.content}>
          <TextInput
            label="Username"
            placeholder="ImageWonder1"
            value={values.username}
            onChangeText={(username: string) =>
              setFieldValue('username', username)
            }
            error={!!errors.username}
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.username}>
            {errors.username}
          </HelperText>
          <TextInput
            ref={emailRef}
            label="Email"
            placeholder="example@email.com"
            value={values.email}
            onChangeText={(email: string) => setFieldValue('email', email)}
            error={!!errors.email}
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.email}>
            {errors.email}
          </HelperText>
          <SecuredTextInput
            ref={passwordRef}
            theme={theme}
            label="Password"
            value={values.password}
            onChangeText={(password: string) =>
              setFieldValue('password', password)
            }
            error={!!errors.password}
            returnKeyType="next"
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            blurOnSubmit={false}
          />
          <HelperText type="error" visible={!!errors.password}>
            {errors.password}
          </HelperText>
          <SecuredTextInput
            ref={confirmPasswordRef}
            theme={theme}
            label="Confirm Password"
            value={values.confirmPassword}
            onChangeText={(confirmPassword: string) =>
              setFieldValue('confirmPassword', confirmPassword)
            }
            error={!!errors.confirmPassword}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <HelperText type="error" visible={!!errors.confirmPassword}>
            {errors.confirmPassword}
          </HelperText>
        </View>
        <View style={styles.actionArea}>
          <Button
            style={styles.buttonWrapper}
            contentStyle={styles.button}
            mode="contained"
            onPress={onSubmit}>
            Sign Up
          </Button>
        </View>
      </View>
    </>
  );
};

export default SignUp;
