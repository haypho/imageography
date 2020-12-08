import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Groups from '../groups';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="groups"
        component={Groups}
        options={{ tabBarIcon: 'layers' }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
