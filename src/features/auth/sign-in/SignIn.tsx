import React, { useCallback } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { useFormikContext } from 'formik';
import { SignInFormValues } from './signIn.validation';

const SignIn: React.FC = () => {
  const {
    values,
    setFieldValue,
    submitForm,
  } = useFormikContext<SignInFormValues>();

  const setEmail = useCallback(
    (email: string) => setFieldValue('email', email),
    [setFieldValue],
  );
  const setPassword = useCallback(
    (password: string) => setFieldValue('password', password),
    [setFieldValue],
  );

  return (
    <>
      <TextInput label="Email" value={values.email} onChangeText={setEmail} />
      <TextInput
        label="Password"
        value={values.password}
        onChangeText={setPassword}
      />
      <Button onPress={submitForm}>Sign In</Button>
    </>
  );
};

export default SignIn;
