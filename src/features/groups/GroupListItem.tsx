import React from 'react';
import { List } from 'react-native-paper';
import { Group } from '../../models/group';
import { ListRenderItem } from 'react-native';

const GroupListItem: ListRenderItem<Group> = ({ item }) => {
  return (
    <List.Item
      title={item.name}
      left={() => <List.Icon color={item.color} icon="circle-slice-8" />}
      right={() => <List.Icon icon="chevron-right" />}
    />
  );
};

export default GroupListItem;
