import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: {},
    avatar: "",
    accountUpdateTitle: null,
    passwordUpdateTitle: null
  },
  reducers: {
    saveAccount(state, action) {
      state.account = action.payload;
    },
    deleteAccount(state) {
      state.account = {};
    },
    saveAvatar(state, action) {
      state.avatar = action.payload;
    },
    accountUpdate(state, action) {
      state.accountUpdateTitle = action.payload;
    },
    passwordUpdate(state, action) {
      state.passwordUpdateTitle = action.payload;
    },
  }
});

export default accountSlice.reducer;
export const { saveAccount, deleteAccount, saveAvatar, accountUpdate, passwordUpdate } = accountSlice.actions;
