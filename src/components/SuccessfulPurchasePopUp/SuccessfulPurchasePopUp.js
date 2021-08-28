import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeBlur,
  showAndHidePortal,
  clearCart
} from "../../store";
import { CloseSvg } from "../icons/Icons";
import "./SuccessfulPurchasePopUp.css";

const SuccessfulPurchasePopUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
    dispatch(clearCart());
    history.push("/shop-app");
  };

  const continueShopping = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
    dispatch(clearCart());
    history.push("/shop-app");
  };

  const showOrders = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
    dispatch(clearCart());
    history.push("/shop-app/orders");
  };

  return (
    <>
      <div className="successful-pop-up-container">
        <div className="close-favourites">
          <div onClick={closeModal}><CloseSvg/></div>
        </div>
        <div className="successful-text-container">
          Thank you for your purchase
        </div>
        <div className="successful-text">
          We will send you a notification when your order arrives to you
        </div>
        <div className="favourites-btn-container">
          <button className="btn-successful" onClick={continueShopping}>
            <span>Continue shopping</span>
          </button>
          <button className="successful-lite" onClick={showOrders}>
            <span> View order history</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SuccessfulPurchasePopUp;
