import React from "react";
import { useDispatch } from "react-redux";
import {
  changeBlur,
  showAndHidePortal
} from "../../store";
import { CloseSvg } from "../icons/Icons";
import modalName from "../../constans/modalName";
import "./FavouritesPopUp.css";

const FavouritesPopUp = () => {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
  };

  const openLogin = () => {
    dispatch(showAndHidePortal(modalName.login));
    dispatch(changeBlur(true));
  };

  const openRegister = () => {
    dispatch(showAndHidePortal(modalName.registrations));
    dispatch(changeBlur(true));
  };

  return (
    <>
      <div className="favourite-pop-up-container">
        <div className="close-favourites">
          <div onClick={closeModal}><CloseSvg/></div>
        </div>
            <div className="favourite-text-container">
              To continue please  register or log in
            </div>
          <div className="favourites-btn-container">
            <button className="btn-favourite" onClick={openLogin}>
              <span>Continue to sign in</span>
            </button>
            <button className="btn-favourite" onClick={openRegister}>
              <span>Continue to register</span>
            </button>
            <button className="favourite-lite" onClick={closeModal}>
              <span>Continue as guest</span>
            </button>
          </div>
        </div>
    </>
  );
};

export default FavouritesPopUp;
