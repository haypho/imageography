import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInForm from '@app/features/auth/sign-in';
import SignUpForm from '@app/features/auth/sign-up';
import ForgotPasswordForm from '@app/features/auth/forgot-password';
import UsernameVerficationForm from '@app/features/auth/username-verification/UsernameVerificationForm';
import { AuthStackParamList } from './authStackParamList';

const AuthStack = createStackNavigator<AuthStackParamList>();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn" component={SignInForm} />
      <AuthStack.Screen name="SignUp" component={SignUpForm} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordForm} />
      <AuthStack.Screen name="UsernameVerification" component={UsernameVerficationForm} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
