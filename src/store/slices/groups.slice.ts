import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '@app/models/group';
import { fetchAllGroups } from '@app/store/thunks/groups.thunks';

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
  reducers: {
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
  },
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
export const { addGroup } = slice.actions;
