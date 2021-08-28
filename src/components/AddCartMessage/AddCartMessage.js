import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cartTitleSelector,
  changeCartTitle,
  accountUpdate,
  passwordUpdate,
  passwordUpdateSelector,
  accountUpdateSelector
} from "../../store";
import { CloseSvg } from "../icons/Icons";
import "./AddCartMessage.css";

const AddCartMessage = () => {
  const title = useSelector(cartTitleSelector);
  const password = useSelector(passwordUpdateSelector);
  const account = useSelector(accountUpdateSelector);
  const dispatch = useDispatch();

  const close = () => {
    dispatch(changeCartTitle(null));
    dispatch(accountUpdate(null));
    dispatch(passwordUpdate(null));
  };

  useEffect(() => {
    const time = setTimeout(() => {
      close();
    }, 3000);
    return () => {
      clearTimeout(time);
    };
  }, []);

  return (
    <div className="add-cart-mass-container">
      {title && <div className="mess-title">
        The {title} is successfully added to cart
      </div>}
      {password && <div className="mess-title">
        The password is successfully update
      </div>}
      {account && <div className="mess-title">
        The account is successfully update
      </div>}
      <div className="close-mass" onClick={close}>
        <CloseSvg/>
      </div>
    </div>
  );
};
export default AddCartMessage;
