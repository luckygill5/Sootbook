
// src/features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: '',
};

const UserSaveListSlices = createSlice({
  name: 'UserList',
  initialState,
  reducers: {
    addUserSaveList: (state, action) => {
      state.data = action.payload;
    },
    addData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {addUserSaveList, addData } = UserSaveListSlices.actions;
export default UserSaveListSlices.reducer;