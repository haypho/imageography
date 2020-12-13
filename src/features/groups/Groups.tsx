import React, { useCallback, useEffect, useState } from 'react';
import { Appbar, Divider, Searchbar, FAB } from 'react-native-paper';
import { Group } from '../../models/group';
import { useDispatch, useSelector } from 'react-redux';
import {
  groupsLoadingSelector,
  groupsSelector,
} from '../../store/selectors/groups.selectors';
import { fetchAllGroups } from '../../store/thunks/groups.thunks';
import { FlatList, StyleSheet } from 'react-native';
import GroupListItem from './GroupListItem';
import { margin } from '../../constants/styles';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  searchbar: {
    margin: margin.medium,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const Groups: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const groups: Group[] = useSelector(groupsSelector);
  const groupsLoading: boolean = useSelector(groupsLoadingSelector);

  useEffect(() => {
    dispatch(fetchAllGroups());
  }, [dispatch]);

  const onRefresh = useCallback(() => dispatch(fetchAllGroups('server')), [
    dispatch,
  ]);

  const filterGroups = useCallback((): Group[] => {
    return groups.filter((group: Group): boolean => {
      if (searchQuery) {
        return group.name
          .toLocaleLowerCase()
          .includes(searchQuery.toLocaleLowerCase());
      }
      return true;
    });
  }, [groups, searchQuery]);

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      <Searchbar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search"
        style={styles.searchbar}
      />
      <FlatList
        data={filterGroups()}
        refreshing={groupsLoading}
        onRefresh={onRefresh}
        renderItem={GroupListItem}
        ItemSeparatorComponent={Divider}
      />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate('addGroup')}
      />
    </>
  );
};

export default Groups;
