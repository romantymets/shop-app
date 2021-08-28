import React from "react";
import { DeleteSvg } from "../../../components/icons/Icons";
import { useDispatch } from "react-redux";
import { addToCart, deleteProductCart } from "../../../store";

const CartProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const minusClick = () => {
    if (product.quantity > 1) {
      dispatch(addToCart({ ...product, quantity: product.quantity - 1 }));
    }
  };

  const deleteProduct = () => dispatch(deleteProductCart(product.id));

  const plusClick = () => dispatch(addToCart({ ...product, quantity: product.quantity + 1 }));

  return (
    <li key={product.id} className="cart-product">
      <div className="product-cart-img">
        <img src={product.picture} alt="loading" width="125px" height="122px"/>
      </div>
      <div className="product-options">
        <div className="title-and-counter">
          <div className="title-cart">
            {product.title}
          </div>
          <div className="counter-cart-container">
            <div className="delete-item-cart" onClick={deleteProduct}>
              <DeleteSvg/>
            </div>
            <div className="counter-btn" onClick={minusClick}>
              <div className="minus"></div>
            </div>
            <div className="counter">{product.quantity}</div>
            <div className="counter-btn" onClick={plusClick}>
              <div className="minus"></div>
              <div className="plus"></div>
            </div>
          </div>
        </div>
        <div className="options-container">
          <div className="price-and-empty-cart">
            <div className="empty-div-cart">
            </div>
            <div className="price-cart">
              <span className="price-cart-text">Price:</span>
              <span className="price-number">$ {product.price}</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
export default CartProductItem;
