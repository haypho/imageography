import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import GroupsRoute from '../groups';

const BottomTabs: React.FC = () => {
  const [index, setIndex] = useState<number>(0);
  const [routes] = useState([
    { key: 'groups', title: 'Groups', icon: 'groups' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    groups: GroupsRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomTabs;
