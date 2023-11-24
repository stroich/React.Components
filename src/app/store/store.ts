import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';

import detailsSlice from '@/app/store/actions/detailsSlice.ts';

import arrArtworksSlice from './actions/arrArtworksSlice.ts';
import numberOfCardSlice from './actions/numberOfCardSlice.ts';
import pageSlice from './actions/pageSlice.ts';
import searchSlice from './actions/searchSlice.ts';
import { api } from './api/artwork.api.ts';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  arrArtworks: arrArtworksSlice,
  search: searchSlice,
  page: pageSlice,
  numberOfCard: numberOfCardSlice,
  details: detailsSlice,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const wrapper = createWrapper<AppStore>(store, { debug: true });
