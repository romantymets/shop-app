import { createSlice } from "@reduxjs/toolkit";

const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
    favouritesId: null
  },
  reducers: {
    saveFavourites(state, action) {
      state.favourites = action.payload;
    },
    loadMoreFavourites(state, action) {
      state.favourites = [...state.favourites, ...action.payload];
    },
    deleteFavourites(state) {
      state.favourites = [];
    }
  }
});

export default favouritesSlice.reducer;
export const { saveFavourites, deleteFavourites, loadMoreFavourites } = favouritesSlice.actions;
