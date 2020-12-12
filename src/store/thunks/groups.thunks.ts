import { createAsyncThunk } from '@reduxjs/toolkit';
import { Group } from '../../features/models/group';
import { RootState } from '../store';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export const fetchAllGroups = createAsyncThunk<
  Group[],
  'cache' | 'server' | undefined,
  { state: RootState }
>(
  'fetchAllGroups',
  async (source = 'cache'): Promise<Group[]> => {
    const user = auth().currentUser;
    if (user) {
      const snapshot = await firestore()
        .collection(`users/${user.uid}/groups`)
        .get({ source });
      return snapshot.empty
        ? []
        : snapshot.docs.map(Group.fromFirestoreDocument);
    }

    return new Promise((resolve) => resolve([]));
  },
  {
    condition: (_, api) => !api.getState().groups.loading,
  },
);
