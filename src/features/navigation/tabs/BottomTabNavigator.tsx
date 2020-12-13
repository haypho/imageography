import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Account from '../../account';
import GroupsStackNavigator from './GroupsStackNavigator';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="groups" labeled={false}>
      <Tab.Screen
        name="GroupsStack"
        component={GroupsStackNavigator}
        options={{ tabBarIcon: 'layers', title: undefined }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ tabBarIcon: 'account' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
