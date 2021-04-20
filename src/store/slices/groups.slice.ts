import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Group } from '@app/models/group';
import { fetchGroups } from '@app/store/thunks/groups.thunks';
import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface GroupsState {
  groups: Group[];
  fetching: boolean;
  firestoreOffset?: FirebaseFirestoreTypes.QueryDocumentSnapshot;
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGroups.pending, (state) => {
      state.fetching = true;
    });

    builder.addCase(fetchGroups.fulfilled, (state, action) => {
      console.log('state', action.payload.data);
      state.groups = action.payload.data;
      state.firestoreOffset = action.payload.offset;
      state.fetching = false;
    });

    builder.addCase(fetchGroups.rejected, (state, action) => {
      state.fetching = false;
      console.log(action.payload);
      state.error = true;
    });
  },
});

export const reducer = slice.reducer;
export const { addGroup } = slice.actions;
