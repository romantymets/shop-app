import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
    singleProduct: [],
    search: "",
    sorting: "Sorting"
  },
  reducers: {
    loadMoreProduct(state, action) {
      state.product = [...state.product, ...action.payload];
    },
    saveProduct(state, action) {
      state.product = action.payload;
    },
    saveSearch(state, action) {
      state.search = action.payload;
    },
    saveSingleProduct(state, action) {
      state.singleProduct = action.payload;
    },
    saveSortValue(state, action) {
      state.sorting = action.payload;
    }
  }
});

export default productSlice.reducer;
export const { saveProduct, saveSingleProduct, saveSearch, loadMoreProduct, saveSortValue } = productSlice.actions;
