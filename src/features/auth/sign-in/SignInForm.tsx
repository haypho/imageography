import React, { useCallback } from 'react';
import { Formik } from 'formik';
import { validationSchema, SignInFormValues } from './signIn.validation';
import auth from '@react-native-firebase/auth';
import SignIn from './SignIn';

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const onSubmit = useCallback((values: SignInFormValues) => {
    auth().signInWithEmailAndPassword(values.email, values.password);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <SignIn />
    </Formik>
  );
};

export default SignInForm;
