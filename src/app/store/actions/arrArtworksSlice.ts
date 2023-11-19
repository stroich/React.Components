import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CardData } from '../../../types/types.ts';

export interface arrArtworksState {
  arrArtworks: Array<CardData> | [];
}

const initialState: arrArtworksState = {
  arrArtworks: [],
};

const arrArtworksSlice = createSlice({
  name: 'arrArtworks',
  initialState,
  reducers: {
    updateArtworks: (state, action: PayloadAction<Array<CardData>>) => {
      state.arrArtworks = action.payload;
    },
  },
});

export const { updateArtworks } = arrArtworksSlice.actions;

export default arrArtworksSlice.reducer;
