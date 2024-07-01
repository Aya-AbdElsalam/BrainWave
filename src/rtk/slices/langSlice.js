import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
  initialState: {
    lang: "En",
  },
  name: "langSlice",
  reducers: {
    changeLang(state, action) {
      state.lang = action.payload;
    },
  },
});
export const { changeLang } = langSlice.actions;
export default langSlice.reducer;
