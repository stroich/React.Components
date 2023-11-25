import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DetailsCard } from '@/types/types.ts';

export interface detailsState {
  details: DetailsCard;
}

const initialState: detailsState = {
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
