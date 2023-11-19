import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { arr } from './mockData.ts';
import arrArtworksSlice, {
  arrArtworksState,
} from '../app/store/actions/arrArtworksSlice.ts';
import detailLoadingSlice, {
  detailLoadingState,
} from '../app/store/actions/detailLoadingSlice.ts';
import mainLoadingSlice, {
  mainLoadingState,
} from '../app/store/actions/mainLoadingSlice.ts';
import numberOfCardSlice, {
  numberOfCardState,
} from '../app/store/actions/numberOfCardSlice.ts';
import pageSlice, { pageState } from '../app/store/actions/pageSlice.ts';
import searchSlice from '../app/store/actions/searchSlice.ts';
import { api } from '../app/store/api/artwork.api.ts';

interface RootState {
  arrArtworks: arrArtworksState;
  search: { search: string };
  mainLoading: mainLoadingState;
  detailLoading: detailLoadingState;
  page: pageState;
  numberOfCard: numberOfCardState;
}

const rootReducer = combineReducers({
  arrArtworks: arrArtworksSlice,
  search: searchSlice,
  mainLoading: mainLoadingSlice,
  detailLoading: detailLoadingSlice,
  page: pageSlice,
  numberOfCard: numberOfCardSlice,
  [api.reducerPath]: api.reducer,
});

export const mockStoreWithoutFetch = (newState: RootState) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    preloadedState: newState,
  });
};

export const initialState: RootState = {
  arrArtworks: {
    arrArtworks: arr,
  },
  search: { search: '' },
  mainLoading: {
    isLoading: false,
  },
  detailLoading: {
    isLoading: false,
  },
  page: {
    totalPage: 10,
    page: 1,
  },
  numberOfCard: {
    numberOfCard: 8,
  },
};
