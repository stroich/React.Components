import { combineReducers, configureStore } from '@reduxjs/toolkit';

import arrArtworksSlice from './actions/arrArtworksSlice.ts';
import detailLoadingSlice from './actions/detailLoadingSlice.ts';
import mainLoadingSlice from './actions/mainLoadingSlice.ts';
import numberOfCardSlice from './actions/numberOfCardSlice.ts';
import pageSlice from './actions/pageSlice.ts';
import searchSlice from './actions/searchSlice.ts';
import { api } from './api/artwork.api.ts';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  arrArtworks: arrArtworksSlice,
  search: searchSlice,
  mainLoading: mainLoadingSlice,
  detailLoading: detailLoadingSlice,
  page: pageSlice,
  numberOfCard: numberOfCardSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
