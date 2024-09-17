
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

const UserListSlices = createSlice({
  name: 'UserList',
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

export const {setData, addData } = UserListSlices.actions;
export default UserListSlices.reducer;