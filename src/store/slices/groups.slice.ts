import { createSlice, Slice } from '@reduxjs/toolkit';
import { Group } from '../../models/group';
import { fetchAllGroups } from '../thunks/groups.thunks';

export interface GroupsState {
  groups: Group[];
  loading: boolean;
}

const initialState: GroupsState = {
  groups: [],
  loading: false,
};

const slice: Slice<GroupsState, {}, 'groupsSlice'> = createSlice({
  initialState,
  name: 'groupsSlice',
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllGroups.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(fetchAllGroups.fulfilled, (state, action) => {
      state.groups = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchAllGroups.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const reducer = slice.reducer;
