import React, { useCallback } from 'react';
import { Formik } from 'formik';
import SignUp from './SignUp';
import { SignUpFormValues, validationSchema } from './signUp.validation';

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const onSubmit = useCallback(() => console.log('submit sign up'), []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <SignUp />
    </Formik>
  );
};

export default SignUpForm;
