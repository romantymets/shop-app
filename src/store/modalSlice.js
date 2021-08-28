import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isModalOpen: "",
    blur: false
  },
  reducers: {
    showAndHidePortal(state, action) {
      state.isModalOpen = action.payload;
    },
    changeBlur(state, action) {
      state.blur = action.payload;
    }
  }
});

export default modalSlice.reducer;
export const { showAndHidePortal, changeBlur } = modalSlice.actions;
