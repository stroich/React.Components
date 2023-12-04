import { createSlice } from '@reduxjs/toolkit';

interface CountriesState {
  list: string[];
}

const initialState: CountriesState = {
  list: [
    'Georgia',
    'Russia',
    'Poland',
    'Belarus',
    'Lithuania',
    'Germany',
    'France',
  ],
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
});

export const selectCountries = (state: { countries: CountriesState }) =>
  state.countries.list;

export default countriesSlice.reducer;
