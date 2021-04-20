import React, { useCallback, useEffect, useState } from 'react';
import { Appbar, Divider, Searchbar, FAB } from 'react-native-paper';
import { Group } from '@app/models/group';
import { useDispatch, useSelector } from 'react-redux';
import { groupsFetchingSelector, groupsSelector } from '@app/store/selectors/groups.selectors';
import { fetchGroups } from '@app/store/thunks/groups.thunks';
import { FlatList, StyleSheet } from 'react-native';
import GroupListItem from './GroupListItem';
import { MARGIN } from '@app/constants';
import { useNavigation } from '@react-navigation/native';
import GroupListEmptyComponent from './GroupListEmptyComponent';

const styles = StyleSheet.create({
  searchbar: {
    margin: MARGIN.medium,
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
  const groupsFetching: boolean = useSelector(groupsFetchingSelector);

  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onRefresh = useCallback(() => dispatch(fetchGroups({ source: 'server', limit: 10 })), [dispatch]);

  const filterGroups = useCallback(
    (): Group[] =>
      groups.filter(
        (group: Group): boolean =>
          !searchQuery || group.name.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()),
      ),
    [groups, searchQuery],
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Groups" />
      </Appbar.Header>
      <Searchbar value={searchQuery} onChangeText={setSearchQuery} placeholder="Search" style={styles.searchbar} />
      <FlatList
        data={filterGroups()}
        keyExtractor={(group: Group) => group.id}
        refreshing={groupsFetching}
        onRefresh={onRefresh}
        renderItem={GroupListItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => <GroupListEmptyComponent isFiltered={!!searchQuery} />}
      />
      <FAB style={styles.fab} icon="plus" onPress={() => navigation.navigate('addGroup')} />
    </>
  );
};

export default Groups;
