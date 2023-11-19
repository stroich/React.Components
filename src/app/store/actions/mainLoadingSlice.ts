import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface mainLoadingState {
  isLoading: boolean;
}

const initialState: mainLoadingState = {
  isLoading: true,
};

const mainLoadingSlice = createSlice({
  name: 'mainLoading',
  initialState,
  reducers: {
    updateMainLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateMainLoading } = mainLoadingSlice.actions;

export default mainLoadingSlice.reducer;
