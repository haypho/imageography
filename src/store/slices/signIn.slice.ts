import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SignInState {
  user: FirebaseAuthTypes.User | null;
  initializing: boolean;
}

const initialState: SignInState = {
  user: null,
  initializing: true,
};

const slice = createSlice({
  initialState,
  name: 'signInSlice',
  reducers: {
    setUser(
      state: SignInState,
      action: PayloadAction<FirebaseAuthTypes.User | null>,
    ) {
      state.user = action.payload;
    },
    setInitializing(state: SignInState, action: PayloadAction<boolean>) {
      state.initializing = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const { setUser, setInitializing } = slice.actions;
