import React from "react";
import { useDispatch } from "react-redux";
import modalName from "../../../../constans/modalName";
import { changeBlur, showAndHidePortal } from "../../../../store";

export const RegisterAndLogin = () => {
  const dispatch = useDispatch();

  const openLogin = () => {
    dispatch(showAndHidePortal(modalName.login));
    dispatch(changeBlur(true));
  };

  const openRegister = () => {
    dispatch(showAndHidePortal(modalName.registrations));
    dispatch(changeBlur(true));
  };

  return (
    <div className="register-container">
      <span className="register" onClick={openRegister}> Register</span>
      <div className="register-line"/>
      <span className="login" onClick={openLogin}> Log In</span>
    </div>
  );
};
