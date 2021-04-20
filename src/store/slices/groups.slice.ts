import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '@app/models/group';
import { fetchGroups } from '@app/store/thunks/groups.thunks';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface GroupsState {
  groups: Group[];
  fetching: boolean;
  firestoreOffset?: FirebaseFirestoreTypes.QueryDocumentSnapshot | null;
  error: boolean;
}

const initialState: GroupsState = {
  groups: [],
  fetching: false,
  error: false,
};

const slice = createSlice({
  initialState,
  name: 'groupsSlice',
  reducers: {
    addGroup(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
      state.groups = state.groups.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.fetching = true;
    });

    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      state.groups.push(...action.payload.data);
      state.firestoreOffset = action.payload.offset ?? null;
      state.fetching = false;
    });

    builder.addCase(fetchGroups.rejected, (state) => {
      state.fetching = false;
      state.error = true;
    });
  },
});

export const reducer = slice.reducer;
export const { addGroup } = slice.actions;
