import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '../../features/models/group';
import { fetchAllGroups } from '../thunks/groups.thunks';

export interface GroupsState {
  groups: Group[];
  loading: boolean;
}

const initialState: GroupsState = {
  groups: [],
  loading: false,
};

const slice = createSlice({
  initialState,
  name: 'groupsSlice',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchAllGroups.pending,
      (state: GroupsState): GroupsState => ({
        ...state,
        loading: true,
      }),
    );
    builder.addCase(
      fetchAllGroups.fulfilled,
      (state: GroupsState, action: PayloadAction<Group[]>): GroupsState => ({
        ...state,
        groups: action.payload,
        loading: false,
      }),
    );
    builder.addCase(
      fetchAllGroups.rejected,
      (state: GroupsState): GroupsState => ({
        ...state,
        loading: false,
      }),
    );
  },
});

export const reducer = slice.reducer;
