import { createSelector } from '@reduxjs/toolkit';
import { Group } from '../../models/group';
import { GroupsState } from '../slices/groups.slice';
import { RootState } from '../store';

const groupStateSelector = (state: RootState): GroupsState => state.groups;

export const groupsSelector = createSelector(groupStateSelector, (state: GroupsState): Group[] => state.groups);

export const groupsFetchingSelector = createSelector(
  groupStateSelector,
  (state: GroupsState): boolean => state.fetching,
);
