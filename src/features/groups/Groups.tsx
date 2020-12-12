import React, { useEffect } from 'react';
import { ActivityIndicator, Appbar, Text } from 'react-native-paper';
import { Group } from '../models/group';
import { useDispatch, useSelector } from 'react-redux';
import {
  groupsLoadingSelector,
  groupsSelector,
} from '../../store/selectors/groups.selectors';
import { fetchAllGroups } from '../../store/thunks/groups.thunks';

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const groups: Group[] = useSelector(groupsSelector);
  const groupsLoading: boolean = useSelector(groupsLoadingSelector);

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      {groupsLoading && <ActivityIndicator />}
      {groups.map((group) => (
        <Text key={group.id}>{group.id}</Text>
      ))}
    </>
  );
};

export default Groups;
