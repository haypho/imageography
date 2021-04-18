import React, { useCallback } from 'react';
import { Formik, FormikHelpers } from 'formik';
import { validationSchema, SignInFormValues } from './signIn.validation';
import auth from '@react-native-firebase/auth';
import SignIn from './SignIn';
import { useNavigation } from '@react-navigation/core';
import { AuthStackParamList } from '@app/features/navigation/auth/authStackParamList';
import { StackNavigationProp } from '@react-navigation/stack';
import { emailVerificationRouteParams } from '../emailVerificationRouteParams';
import { useDispatch } from 'react-redux';
import { setUser } from '@app/store/slices/signIn.slice';

const initialValues: SignInFormValues = {
  email: '',
  password: '',
};

const SignInForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<
    StackNavigationProp<AuthStackParamList, 'SignIn'>
  >();
  const onSubmit = useCallback(
    (
      values: SignInFormValues,
      formikHelpers: FormikHelpers<SignInFormValues>,
    ) => {
      auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          const user = userCredential.user;
          const { displayName, emailVerified } = user;

          if (emailVerified) {
            dispatch(setUser(user));
          } else if (displayName) {
            navigation.setParams(emailVerificationRouteParams);
          } else {
            navigation.navigate('UsernameVerification');
          }
        })
        .catch(() => formikHelpers.setStatus('invalid'))
        .finally(() => formikHelpers.setSubmitting(false));
    },
    [dispatch, navigation],
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
