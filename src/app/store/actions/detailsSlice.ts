import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DetailsCard } from '@/types/types.ts';

export interface arrArtworksState {
  details: DetailsCard;
}

const initialState: arrArtworksState = {
  details: {
    title: '',
    description: '',
    data: '',
    culture: '',
  },
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    updateDetails: (state, action: PayloadAction<DetailsCard>) => {
      state.details = action.payload;
    },
  },
});

export const { updateDetails } = detailsSlice.actions;

export default detailsSlice.reducer;
