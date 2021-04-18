import { UsernameService } from '@app/services/username.service';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/core';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useEffect } from 'react';
import UsernameVerfication from './UsernameVerification';
import {
  UsernameVerificationFormValues,
  validationSchema,
} from './usernameVerification.validation';
import auth from '@react-native-firebase/auth';
import { Keyboard } from 'react-native';
import { emailVerificationRouteParams } from '../emailVerificationRouteParams';

const initialValues: UsernameVerificationFormValues = {
  username: '',
};

const UsernameVerficationForm: React.FC = () => {
  const user: FirebaseAuthTypes.User | null = auth().currentUser;
  const navigation = useNavigation();
  const onSubmit = useCallback(
    (
      values: UsernameVerificationFormValues,
      formikHelpers: FormikHelpers<UsernameVerificationFormValues>,
    ) => {
      Keyboard.dismiss();
      UsernameService.saveUsername(values.username)
        .then(() => {
          auth().currentUser?.sendEmailVerification();
          navigation.navigate('SignIn', emailVerificationRouteParams);
        })
        .catch((errors) => formikHelpers.setErrors(errors))
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [navigation],
  );

  useEffect(() => {
    if (user?.displayName) {
      navigation.navigate('EmailVerification');
    }
  }, [user, navigation]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <UsernameVerfication />
    </Formik>
  );
};

export default UsernameVerficationForm;
