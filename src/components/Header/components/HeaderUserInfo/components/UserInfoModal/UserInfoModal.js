import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSelector,
  deleteAccount,
  deleteToken,
  deleteFavourites
} from "../../../../../../store";
import "./UserInfoModal.css";

export const UserInfoModal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const account = useSelector(accountSelector) || {};

  const LogOut = () => {
    localStorage.removeItem("token");
    dispatch(deleteFavourites());
    dispatch(deleteAccount());
    dispatch(deleteToken());
  };

  return (
    <div className="user-info-container">
      <div className="user-info-name-and-email">
        <div className="user-info-name">
          {account.fullName}
        </div>
        <div className="user-info-email">
          {account.email}
        </div>
      </div>
      <div className="user-info-empty-div"/>
      <div className="user-info-setting-log-out">
        <div className="user-info-setting">
          <span onClick={() => history.push("/shop-app/myAccount")}> Setting </span>
        </div>
        <div className="user-info-log-out">
          <span onClick={LogOut}>Log Out</span>
        </div>
      </div>
    </div>
  );
};
