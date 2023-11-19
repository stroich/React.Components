import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface detailLoadingState {
  isLoading: boolean;
}

const initialState: detailLoadingState = {
  isLoading: true,
};

const detailLoadingSlice = createSlice({
  name: 'detailLoading',
  initialState,
  reducers: {
    updateDetailLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { updateDetailLoading } = detailLoadingSlice.actions;

export default detailLoadingSlice.reducer;
