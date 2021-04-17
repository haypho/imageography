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
      try {
        await SignUpService.signUp(values);
        navigation.navigate('UsernameVerification');
        console.log('Created User');
      } catch (error) {
        console.error('Failed to create user', error);
        formikHelpers.setErrors(error);
      }
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
