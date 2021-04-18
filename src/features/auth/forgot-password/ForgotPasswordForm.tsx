import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import {
  ForgotPasswordFormValues,
  validationSchema,
} from './forgotPassword.validation';
import ForgotPassword from './ForgotPassword';
import auth from '@react-native-firebase/auth';
import { Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { forgotPasswordRouteParams } from '../forgotPasswordRouteParams';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '@app/features/navigation/auth/authStackParamList';

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

const ForgotPasswordForm: React.FC = () => {
  const navigation = useNavigation<
    StackNavigationProp<AuthStackParamList, 'ForgotPassword'>
  >();
  const onSubmit = useCallback(
    (
      values: ForgotPasswordFormValues,
      formikHelpers: FormikHelpers<ForgotPasswordFormValues>,
    ) => {
      Keyboard.dismiss();
      auth()
        .sendPasswordResetEmail(values.email)
        .then(() => navigation.navigate('SignIn', forgotPasswordRouteParams))
        .catch(() => navigation.navigate('SignIn', forgotPasswordRouteParams))
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [navigation],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <ForgotPassword />
    </Formik>
  );
};

export default ForgotPasswordForm;
