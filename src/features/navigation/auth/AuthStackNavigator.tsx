import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignInForm from '../../auth/sign-in';
import SignUpForm from '../../auth/sign-up';
import ForgotPasswordForm from '../../auth/forgot-password';

const AuthStack = createStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator headerMode="none">
      <AuthStack.Screen name="SignIn" component={SignInForm} />
      <AuthStack.Screen name="SignUp" component={SignUpForm} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordForm} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
