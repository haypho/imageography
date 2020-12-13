import React, { useCallback } from 'react';
import { Formik } from 'formik';
import {
  ForgotPasswordFormValues,
  validationSchema,
} from './forgotPassword.validation';
import ForgotPassword from './ForgotPassword';

const initialValues: ForgotPasswordFormValues = {
  email: '',
};

const ForgotPasswordForm: React.FC = () => {
  const onSubmit = useCallback(() => console.log('submit forgot password'), []);

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
