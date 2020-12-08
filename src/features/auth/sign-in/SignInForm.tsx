import React, { ReactNode, useCallback } from 'react';
import { Formik } from 'formik';
import { SignInFormValues, validationSchema } from './signIn.validation';
import auth from '@react-native-firebase/auth';

export interface SignInFormProps {
  children?: ReactNode;
}

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC<SignInFormProps> = ({ children }) => {
  const onSubmit = useCallback((values: SignInFormValues) => {
    auth().signInWithEmailAndPassword(values.email, values.password);
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      {children}
    </Formik>
  );
};

export default SignInForm;
