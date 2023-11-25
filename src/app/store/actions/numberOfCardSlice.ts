import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface numberOfCardState {
  numberOfCard: number;
}

const initialState: numberOfCardState = {
  numberOfCard: 8,
};

const numberOfCardSlice = createSlice({
  name: 'numberOfCard',
  initialState,
  reducers: {
    updateNumberOfCard: (state, action: PayloadAction<number>) => {
      state.numberOfCard = action.payload;
    },
  },
});

export const { updateNumberOfCard } = numberOfCardSlice.actions;

export default numberOfCardSlice.reducer;
