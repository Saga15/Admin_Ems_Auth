import { configureStore } from "@reduxjs/toolkit";
import companySlice from "./companySlice";
import authSlice from "./authSlice";


export const store = configureStore({
    reducer: {
        company : companySlice,
        auth : authSlice,
    },
  })