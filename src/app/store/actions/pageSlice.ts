import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface pageState {
  totalPage: number;
  page: number;
}

const initialState: pageState = {
  page: 1,
  totalPage: 0,
};

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    updateTotalPage: (state, action: PayloadAction<number>) => {
      state.totalPage = action.payload;
    },
    updatePage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { updateTotalPage, updatePage } = pageSlice.actions;

export default pageSlice.reducer;
