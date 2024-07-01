import { configureStore } from "@reduxjs/toolkit";
import langSlice from "./slices/langSlice";
import productsSlice from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    langSlice,
    productsSlice,
  },
});
