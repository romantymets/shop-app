import { combineReducers } from "redux";
import tokenSlice from "./tokenSlice";
import modalSlice from "./modalSlice";
import accountSlice from "./accountSlice";
import productSlice from "./productSlice";
import categorySlice from "./categorySlice";
import favouritesSlice from "./favouritesSlice";
import cartSlice from "./cartSlice";

export const rootReducer = combineReducers({
  tokenReducer: tokenSlice,
  modalReducer: modalSlice,
  accountReducer: accountSlice,
  productReducer: productSlice,
  categoryReducer: categorySlice,
  favouritesReducer: favouritesSlice,
  cartReducer: cartSlice
});
