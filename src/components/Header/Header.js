import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Logo, Basket, Heart } from "../icons/Icons";
import { RegisterAndLogin } from "./components/RegisterAndLogin/RegisterAndLogin";
import {
  tokenSelector,
  saveCategory,
  saveSortValue,
  cartSelector,
  showAndHidePortal,
  changeBlur,
  saveSearch
} from "../../store";
import { HeaderUserInfo } from "./components/HeaderUserInfo/HeaderUserInfo";
import "./Header.css";
import modalName from "../../constans/modalName";

const Header = () => {
  const token = useSelector(tokenSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const carts = useSelector(cartSelector) || [];
  const [quantity, setQuantity] = useState(null);

  useEffect(() => {
    let counter = 0;
    carts.forEach((el) => {
      counter = el.quantity + counter;
    });
    setQuantity(counter);
  }, [carts]);

  const goHome = () => {
    dispatch(saveSortValue("Sorting"));
    dispatch(saveCategory("Choose Category"));
    dispatch(saveSearch(""));
    history.push("/shop-app");
  };

  const favouriteClick = () => {
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    history.push("/shop-app/favourite");
  };

  const cartClick = () => {
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    history.push("/shop-app/cart");
  };

  return (
    <header>
      <div className="navig">
        <div className="logo" onClick={goHome}>
          <Logo/>
        </div>
        <div className="nav-item-container">
          <div className="basket-heart-container">
            <div onClick={favouriteClick}>
              <Heart/>
            </div>
            <div onClick={cartClick} className="basket">
              {token && quantity > 0 && (
                <div className="quantity-counter">
                  <span>{quantity}</span>
                </div>
              )}
              <Basket/>
            </div>
          </div>
          {!token ? <RegisterAndLogin/> : <HeaderUserInfo/>}
        </div>
      </div>
    </header>
  );
};

export default Header;
