import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import SignUp from './SignUp';
import { SignUpFormValues, validationSchema } from './signUp.validation';
import { SignUpService } from '@app/services/signUp.service';
import { useNavigation } from '@react-navigation/core';

const initialValues: SignUpFormValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm: React.FC = () => {
  const navigation = useNavigation();
  const signUp = useCallback(
    async (
      values: SignUpFormValues,
      formikHelpers: FormikHelpers<SignUpFormValues>,
    ) => {
      SignUpService.signUp(values)
        .then(() => navigation.navigate('UsernameVerification'))
        .catch((errors) => formikHelpers.setErrors(errors))
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [navigation],
  );
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={signUp}>
      <SignUp />
    </Formik>
  );
};

export default SignUpForm;
