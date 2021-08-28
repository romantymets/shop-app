import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartTitle: null,
    locations: [],
    order: [],
    orders: []
  },
  reducers: {
    addToCart(state, action) {
      const oldCart = state.cart;
      const findElem = oldCart.filter(prod => prod.id === action.payload.id);
      const findIndElem = oldCart.findIndex(prod => prod.id === action.payload.id);

      if (findElem.length === 0) {
        state.cart = [...state.cart, action.payload];
      } else {
        oldCart.splice(findIndElem, 1, action.payload);
        state.cart = oldCart;
      }
    },
    GetCartFromSesStore(state, action) {
      state.cart = action.payload;
    },
    changeCartTitle(state, action) {
      state.cartTitle = action.payload;
    },
    deleteProductCart(state, action) {
      state.cart = state.cart.filter(el => el.id !== action.payload);
    },
    saveLocations(state, action) {
      state.locations = action.payload;
    },
    saveOrder(state, action) {
      state.order = action.payload;
    },
    saveOrders(state, action) {
      state.orders = action.payload;
    },
    loadMoreOrders(state, action) {
      state.orders = [...action.payload, ...state.orders];
    },

    clearCart(state) {
      state.cart = [];
    }
  }
});

export default cartSlice.reducer;
export const { addToCart, GetCartFromSesStore, changeCartTitle, deleteProductCart, saveLocations, saveOrder, saveOrders, clearCart, loadMoreOrders } = cartSlice.actions;
