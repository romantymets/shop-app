import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import { NotFound } from "./pages/NotFound/NotFound";
import Header from "./components/Header/Header";
import Portal from "./components/Portal/Portal";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  blurSelector,
  saveToken,
  GetCartFromSesStore,
  cartTitleSelector,
  accountUpdateSelector,
  passwordUpdateSelector
} from "./store";
import SearchPage from "../src/pages/Search/SearchPage";
import CategoryPage from "./pages/Category/CategoryPage";
import SortPage from "./pages/Sort/SortPage";
import useAccount from "./hooks/useAccount";
import useAddToCart from "./hooks/useAddToCart";
import Cart from "./pages/Cart/Cart";
import PrivateRoute from "./components/PrivateRouter/PrivateRouter";
import AddCartMessage from "./components/AddCartMessage/AddCartMessage";
import MyAccountPage from "./pages/MyAccountPage/MyAccountPage";
import FavouritesPage from "./pages/FavouritesPage/FavouritesPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const blur = useSelector(blurSelector);
  const titleMass = useSelector(cartTitleSelector);
  const accountUpd = useSelector(accountUpdateSelector);
  const passwordUpd = useSelector(passwordUpdateSelector);

  useEffect(() => {
    const localStorageToken = localStorage.getItem("token");
    dispatch(saveToken(localStorageToken));
    const sesCart = sessionStorage.getItem("cart");
    if (sesCart !== null) {
      dispatch(GetCartFromSesStore(JSON.parse(sesCart)));
    }
  }, []);

  useAccount();
  useAddToCart();

  return (
    <BrowserRouter>
      <div className={blur ? "wrapperBlur" : "wrapper"}>
        <Header />
        <Portal />
        {(titleMass || accountUpd || passwordUpd) && <AddCartMessage/>}
        <Switch>
          <Route exact path="/shop-app">
            <HomePage />
          </Route>
          <Route path="/shop-app/search">
            <SearchPage />
          </Route>
          <Route path="/shop-app/categories/:category">
            <CategoryPage />
          </Route>
          <Route path="/shop-app/sort/:sort">
            <SortPage />
          </Route>
          <PrivateRoute component={Cart} path="/shop-app/cart" exact />
          <PrivateRoute component={MyAccountPage} path="/shop-app/myAccount"/>
          <PrivateRoute component={FavouritesPage} path="/shop-app/favourite"/>
          <PrivateRoute component={OrdersPage} path="/shop-app/orders"/>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
