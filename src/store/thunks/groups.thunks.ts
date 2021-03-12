import { createAsyncThunk } from '@reduxjs/toolkit';
import { Group } from '../../models/group';
import { RootState } from '../store';
import { GroupRepository } from '../../services/repositories/group.repository';

export const fetchAllGroups = createAsyncThunk<
  Group[],
  'cache' | 'server' | undefined,
  { state: RootState }
>(
  'fetchAllGroups',
  async (source = 'cache'): Promise<Group[]> => {
    return GroupRepository.getAll(source);
  },
  {
    condition: (_, api) => !api.getState().groups.loading,
  },
);
