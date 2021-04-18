import { combineReducers, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { reducer as signInReducer } from './slices/signIn.slice';
import { reducer as groupsReducer } from './slices/groups.slice';

const rootReducer = combineReducers({
  signIn: signInReducer,
  groups: groupsReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type RootState = ReturnType<typeof rootReducer>;
export const getAppState = store.getState;
export const appDispatch = store.dispatch;
export default store;
