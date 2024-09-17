// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './Slices/CountryIndusrylistSlices';
import loginReducer from "./Slices/LoginServiceSlices";
import UserListReducer from "./Slices/UserListSlice";
import UserSaveListReducer from "./Slices/UserSaveListSlice"

const store = configureStore({
  reducer: {
    countryIndustrylist: countryReducer,
    loginData:loginReducer,
    userListData:UserListReducer,
    userSaveList:UserSaveListReducer

  },
});

export default store;