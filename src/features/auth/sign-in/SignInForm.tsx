import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { validationSchema, SignInFormValues } from './signIn.validation';
import auth from '@react-native-firebase/auth';
import SignIn from './SignIn';

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const onSubmit = useCallback(
    (
      values: SignInFormValues,
      formikHelpers: FormikHelpers<SignInFormValues>,
    ) => {
      auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .catch(() => {
          formikHelpers.setStatus('invalid');
          formikHelpers.setSubmitting(false);
        });
    },
    [],
  );

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
