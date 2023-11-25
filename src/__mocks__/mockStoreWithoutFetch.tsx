import { combineReducers, configureStore } from '@reduxjs/toolkit';

import detailsSlice from '@/app/store/actions/detailsSlice.ts';

import { arr } from './mockData.ts';
import arrArtworksSlice, {
  arrArtworksState,
} from '../app/store/actions/arrArtworksSlice.ts';
import numberOfCardSlice, {
  numberOfCardState,
} from '../app/store/actions/numberOfCardSlice.ts';
import pageSlice, { pageState } from '../app/store/actions/pageSlice.ts';
import searchSlice from '../app/store/actions/searchSlice.ts';
import { api } from '../app/store/api/artwork.api.ts';

interface RootState {
  arrArtworks: arrArtworksState;
  search: { search: string };
  page: pageState;
  numberOfCard: numberOfCardState;
  details: {
    details: {
      title: string;
      description: string;
      data: string;
      culture: string;
    };
  };
}

const rootReducer = combineReducers({
  arrArtworks: arrArtworksSlice,
  search: searchSlice,
  page: pageSlice,
  numberOfCard: numberOfCardSlice,
  [api.reducerPath]: api.reducer,
  details: detailsSlice,
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
  search: { search: ' ' },
  page: {
    totalPage: 10,
    page: 1,
  },
  numberOfCard: {
    numberOfCard: 8,
  },
  details: {
    details: {
      title: 'Buddha Shakyamuni Seated in Meditation (Dhyanamudra)',
      description:
        '<p>This meditating Buddha comes from the coastal town of Nagapattinam in southern India, which was, as a result of settlers from Srivijaya (Indonesia), one of the few places where Buddhism was still flourishing in the twelfth century. The Buddha\u2014with his elongated earlobes, the wheel marks on his palms, the <em>urna</em> between his brows, and the cranial protuberance covered with snail-shell curls\u2014is seated in the posture of meditation, with his hands resting on his lap <em>(dhyanamudra)</em>, wearing a seemingly diaphanous monastic garment. As in other images from Nagapattinam, a flame emerges out of the Buddha\u2019s cranial protuberance, probably signifying wisdom. This monumental granite sculpture originally would have graced a monastic site at Nagapattinam, which is also well known for its Buddhist bronzes. The Tamil inscription covering its back is no longer legible.</p>\n',
      data: '1101',
      culture: 'India',
    },
  },
};
