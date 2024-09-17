
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

const EmployeeListSlice = createSlice({
  name: 'EmployeeList',
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

export const {setData, addData } = EmployeeListSlice.actions;
export default EmployeeListSlice.reducer;