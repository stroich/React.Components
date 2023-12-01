import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUpdatedValues } from '../../types/types.ts';

interface FormsState {
  formList: IUpdatedValues[];
}

const initialState: FormsState = {
  formList: [],
};

const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addForm: (state, action: PayloadAction<IUpdatedValues>) => {
      state.formList.push(action.payload);
    },
  },
});

export const { addForm } = formsSlice.actions;

export const selectForms = (state: { forms: FormsState }) =>
  state.forms.formList;

export default formsSlice.reducer;
