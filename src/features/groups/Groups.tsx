import React, { useCallback, useEffect } from 'react';
import { Appbar } from 'react-native-paper';
import { Group } from '../models/group';
import { useDispatch, useSelector } from 'react-redux';
import {
  groupsLoadingSelector,
  groupsSelector,
} from '../../store/selectors/groups.selectors';
import { fetchAllGroups } from '../../store/thunks/groups.thunks';
import { FlatList } from 'react-native';
import GroupListItem from './GroupListItem';

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const groups: Group[] = useSelector(groupsSelector);
  const groupsLoading: boolean = useSelector(groupsLoadingSelector);

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  const onRefresh = useCallback(() => dispatch(fetchAllGroups('server')), [
    dispatch,
  ]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      <FlatList
        data={groups}
        refreshing={groupsLoading}
        onRefresh={onRefresh}
        renderItem={GroupListItem}
      />
    </>
  );
};

export default Groups;
