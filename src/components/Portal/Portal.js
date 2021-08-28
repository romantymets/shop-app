import React from "react";
import ReactDOM from "react-dom";
import { useSelector } from "react-redux";
import { isOpenSelector } from "../../store";
import modalName from "../../constans/modalName";
import RegisterForm from "../Register/RegisterForm";
import LoginForm from "../Login/LoginForm";
import Spinner from "../Spinner/Spinner";
import SingleProductPopUp from "../SingleProductPopUp/SingleProductPopUp";
import NotRegisterPopUp from "../NotRegisterPopUp/NotRegisterPopUp";
import SuccessfulPurchasePopUp from "../SuccessfulPurchasePopUp/SuccessfulPurchasePopUp";
import OrderPopup from "../OrderPopup/OrderPopup";
import "./portal.css";

const Portal = () => {
  const isModalOpen = useSelector(isOpenSelector);
  return (isModalOpen !== "") &&
    ReactDOM.createPortal(
      <div className="PopUp">
        {isModalOpen === modalName.registrations && <RegisterForm/>}
        {isModalOpen === modalName.login && <LoginForm/>}
        {isModalOpen === modalName.spinner && <Spinner/>}
        {isModalOpen === modalName.product && <SingleProductPopUp/>}
        {isModalOpen === modalName.notRegister && <NotRegisterPopUp/>}
        {isModalOpen === modalName.successfulPurchase && <SuccessfulPurchasePopUp/>}
        {isModalOpen === modalName.order && <OrderPopup/>}
      </div>, document.getElementById("modal")
    );
};

export default Portal;
