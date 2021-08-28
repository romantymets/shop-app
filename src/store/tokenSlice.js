import { createSlice } from "@reduxjs/toolkit";

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: null
  },
  reducers: {
    saveToken(state, action) {
      state.token = action.payload;
    },
    deleteToken(state) {
      state.token = null;
    }
  }
});

export default tokenSlice.reducer;
export const { saveToken, deleteToken } = tokenSlice.actions;
