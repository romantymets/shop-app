import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeBlur,
  showAndHidePortal,
  orderSelector,
  saveOrder
} from "../../store";
import { CloseSvg } from "../icons/Icons";
import "./OrderPopup.css";

const OrderPopup = () => {
  const dispatch = useDispatch();
  const order = useSelector(orderSelector) || {};
  const { items = [], totalPrice = "", createdAt = "", shipment = {} } = order;

  const countQuantity = () => items.reduce((acc, el) => acc + el.quantity, 0);

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
    dispatch(saveOrder([]));
  };

  return (
    <>
      <div className="order-item-container">
        <div className="close-item">
          <div onClick={closeModal}><CloseSvg/></div>
        </div>
        <div className="order-item-title">
          Order details ID {order.id}
        </div>
        <ul className="order-product-cont">
          {items.map(element => (
            <li key={element.product.id} className="order-product">
              <div className="product-cart-img">
                <img src={element.product.picture} alt="loading" width="125px" height="122px"/>
              </div>
              <div className="order-options">
                <div className="order-title-container">
                  <div className="title">
                    {element.product.title}
                  </div>
                  <div className="item-order-container">
                    <span className="item-order-text">Item:</span>
                    <span className="item-order-count">{element.quantity}</span>
                  </div>
                </div>
                <div className="price-and-empty">
                  <div className="empty-div">
                  </div>
                  <div className="price-order-container">
                    <span className="item-order-text">Price:</span>
                    <span className="price-number">$ {element.product.price}</span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div className="detail-container">
          <div className="data-adr-container">
            <div className="data-container">
              <span className="item-order-text"> Date: </span>
              <span> {new Date(createdAt).toLocaleDateString("de-DE")} </span>
            </div>
            <div className="adr-container">
              <span className="item-order-text"> Address:  </span>
              <span> {shipment.address} </span>
            </div>
          </div>
          <div className="items-tot-container">
            <div className="data-container">
              <span className="item-order-text"> Items: </span>
              <span> {countQuantity()} </span>
            </div>
            <div className="adr-container">
              <span className="item-order-text"> Total: </span>
              <span className="price-number"> $ {totalPrice} </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPopup;
