import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Groups from '../../groups';
import AddGroupForm from '../../groups/add-group';

const GroupsStack = createStackNavigator();

const GroupsStackNavigator: React.FC = () => (
  <GroupsStack.Navigator headerMode="none">
    <GroupsStack.Screen name="groups" component={Groups} />
    <GroupsStack.Screen name="addGroup" component={AddGroupForm} />
  </GroupsStack.Navigator>
);

export default GroupsStackNavigator;
