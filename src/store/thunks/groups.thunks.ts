import { createAsyncThunk } from '@reduxjs/toolkit';
import { Group } from '../../features/models/group';
import FirestoreGroupService from '../../services/FirestoreGroup.service';
import { RootState } from '../store';

export const fetchAllGroups = createAsyncThunk<
  Group[],
  void,
  { state: RootState }
>(
  'fetchAllGroups',
  (): Promise<Group[]> => {
    return FirestoreGroupService.getAllAsync();
  },
  {
    condition: (_, api) => !api.getState().groups.loading,
  },
);
