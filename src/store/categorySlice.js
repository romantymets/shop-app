import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    categoryId: "",
    categoryName: "Choose Category"
  },
  reducers: {
    saveCategories(state, action) {
      state.categories = action.payload;
    },
    saveCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    saveCategory(state, action) {
      state.categoryName = action.payload;
    }
  }
});

export default categorySlice.reducer;
export const { saveCategoryId, saveCategory, saveCategories } = categorySlice.actions;
