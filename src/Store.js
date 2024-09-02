// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import countryReducer from './Slices/CountryIndusrylistSlices';
import loginReducer from "./Slices/LoginServiceSlices"

const store = configureStore({
  reducer: {
    countryIndustrylist: countryReducer,
    loginData:loginReducer,
  },
});

export default store;