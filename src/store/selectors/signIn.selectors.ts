import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSelector } from '@reduxjs/toolkit';
import { SignInState } from '../slices/signIn.slice';
import { RootState } from '../store';

const signInStateSelector = (state: RootState): SignInState => state.signIn;

export const userSelector = createSelector(
  signInStateSelector,
  (state: SignInState): FirebaseAuthTypes.User | null => state.user,
);

export const initializingSelector = createSelector(
  signInStateSelector,
  (state: SignInState): boolean => state.initializing,
);
