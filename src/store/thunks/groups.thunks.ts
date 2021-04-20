import { createAsyncThunk } from '@reduxjs/toolkit';
import { Group, FirestorePaginatedResponse, FirestorePaginatedQuery } from '@app/models';
import { RootState } from '@app/store';
import { GroupRepository } from '@app/services/repositories/group.repository';

export const fetchGroups = createAsyncThunk<
  FirestorePaginatedResponse<Array<Group>>,
  FirestorePaginatedQuery | undefined,
  { state: RootState }
>(
  'fetchGroups',
  async (query = { source: 'cache', limit: 10 }, api): Promise<FirestorePaginatedResponse<Array<Group>>> => {
    const { source, limit } = query;
    const offset = query.offset ?? api.getState().groups.firestoreOffset;
    return GroupRepository.fetchGroups({ source, limit, offset });
  },
  {
    condition: (_, api) => !api.getState().groups.fetching,
  },
);
