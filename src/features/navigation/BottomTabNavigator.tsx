import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Groups from '../groups';
import Account from '../account';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="groups" labeled={false}>
      <Tab.Screen
        name="Groups"
        component={Groups}
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
