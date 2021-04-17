import React, { useCallback, useEffect } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { validationSchema, SignInFormValues } from './signIn.validation';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SignIn from './SignIn';
import { useNavigation } from '@react-navigation/core';

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(
      (user: FirebaseAuthTypes.User | null) => {
        if (user?.displayName) {
          navigation.navigate('EmailVerification');
        }
        if (user) {
          navigation.navigate('UsernameVerification');
        }
      },
    );
    return unsubscribe;
  }, [navigation]);

  const onSubmit = useCallback(
    (
      values: SignInFormValues,
      formikHelpers: FormikHelpers<SignInFormValues>,
    ) => {
      auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((user) => {
          if (user?.user.displayName) {
            navigation.navigate('EmailVerification');
          }
          if (user) {
            navigation.navigate('UsernameVerification');
          }
        })
        .catch(() => formikHelpers.setStatus('invalid'))
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [navigation],
  );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnChange={false}
      onSubmit={onSubmit}>
      <SignIn />
    </Formik>
  );
};

export default SignInForm;
