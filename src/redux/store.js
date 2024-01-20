import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./slice/CategorySlice";

export const store = configureStore({
  reducer: { category: categoryReducer },
});