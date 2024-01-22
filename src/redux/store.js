import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/CategorySlice";
import authReducer from "./slice/AuthenticationSlice";
import profileReducer from "./slice/ProfileSlice";

export const store = configureStore({
  reducer: { category: categoryReducer, auth: authReducer, profile: profileReducer },
});
