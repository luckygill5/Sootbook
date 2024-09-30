
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

const CountryIndusrylistSlices = createSlice({
  name: 'countryIndustrylist',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {setData, addData } = CountryIndusrylistSlices.actions;
export default CountryIndusrylistSlices.reducer;