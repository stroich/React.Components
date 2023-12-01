import { combineReducers, configureStore } from '@reduxjs/toolkit';
import countriesSlice from './actions/countriesSlice.ts';
import formsSlice from './actions/formsSlice.ts';

const rootReducer = combineReducers({
  countries: countriesSlice,
  forms: formsSlice,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
