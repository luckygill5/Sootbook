
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

const EmployeeSaveListSlice = createSlice({
  name: 'EmployeeList',
  initialState,
  reducers: {
    addEmployeeSaveList: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {addEmployeeSaveList, addData } = EmployeeSaveListSlice.actions;
export default EmployeeSaveListSlice.reducer;