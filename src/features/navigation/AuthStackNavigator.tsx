import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../auth/sign-in';

const AuthStack = createStackNavigator();

const AuthStackNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="SignIn" component={SignIn} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
