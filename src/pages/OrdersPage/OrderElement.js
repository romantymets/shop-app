import React from "react";
import { useDispatch } from "react-redux";
import { showAndHidePortal, saveOrder, changeBlur } from "../../store";
import modalName from "../../constans/modalName";

const OrderElement = ({ element = {}, index }) => {
  const dispatch = useDispatch();

  const openModal = () => {
    dispatch(showAndHidePortal(modalName.order));
    dispatch(changeBlur(true));
    dispatch(saveOrder(element));
  };

  return (
    <li className="order-list" key={element.id}>
      <div className="order-id-container">
        <div>
          <span className="order-title">Order ID: </span>
          <span className="order-id" onClick={openModal}>
            {element.id}
          </span>
        </div>
        <div>
          <span className="order-title">Price</span>
          <span className="price-order">
            $ {element.totalPrice}
          </span>
        </div>
      </div>
      <div className="date-container">
        <span className="order-title-data">Date:</span>
        <span className="data">
          {new Date(element.createdAt).toLocaleDateString("de-DE")}
        </span>
      </div>
    </li>
  );
};

export default OrderElement;
