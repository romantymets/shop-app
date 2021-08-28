import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  changeBlur,
  singleProductSelector,
  showAndHidePortal,
  deleteFavouritesIdAction,
  postFavouritesIdAction,
  tokenSelector,
  saveSingleProduct,
  productSelector,
  saveProduct,
  addToCart,
  cartSelector,
  changeCartTitle
} from "../../store";
import { CloseSvg } from "../icons/Icons";
import "./SingleProductPopUp.css";
import modalName from "../../constans/modalName";

const SingleProductPopUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(tokenSelector);
  const product = useSelector(singleProductSelector) || {};
  const products = useSelector(productSelector);
  const cart = useSelector(cartSelector) || [];
  const [isAddedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const cartArr = [...cart];
    const prod = { ...product };
    const findElem = cartArr.find(el => el.id === prod.id);
    if (findElem && token) {
      setQuantity(findElem.quantity);
      setAddedToCart(true);
    } else {
      setQuantity(1);
      setAddedToCart(false);
    }
  }, [product]);

  const [quantity, setQuantity] = useState(1);

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
  };

  const minusClick = () => {
    if (quantity > 1) {
      setQuantity((quantity - 1));
    }
  };

  const plusClick = () => setQuantity(quantity + 1);

  const buyNowClick = () => {
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }));
    closeModal();
    history.push("/shop-app/cart");
  };

  const addToCartClick = () => {
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    dispatch(addToCart({
      ...product,
      quantity: quantity
    }));
    closeModal();
    dispatch(changeCartTitle(product.title));
  };

  const likeClick = () => {
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    product.favorite ? dispatch(deleteFavouritesIdAction(token, product.id)) : dispatch(postFavouritesIdAction(token, product.id));
    const index = products.findIndex(el => el.id === product.id);
    const newProducts = [...products];
    newProducts.splice(index, 1, { ...product, favorite: !product.favorite });
    dispatch(saveSingleProduct({ ...product, favorite: !product.favorite }));
    dispatch(saveProduct(newProducts));
  };

  return (
    <>
      <div className="single-item-container">
        <div className="close-item">
          <div onClick={closeModal}>
            <CloseSvg/>
          </div>
        </div>
        <div className="items-container">
          <div className="img-text-container">
            <div className="img-container">
              <img src={product.picture} alt="loading" width="351px" height="246px"/>
            </div>
            <div className="text-container">
              <div className="title-container">
                {product.title}
              </div>
              <div className="description-container">
                {product.description}
              </div>
              <div className="price-container">
                <div className="price-text">Price
                </div>
                <div className="price-number">
                  ${product.price}
                </div>
              </div>
              <div className="counter-container">
                <div className="counter-btn" onClick={minusClick}>
                  <div className="minus"></div>
                </div>
                <div className="counter">{quantity}</div>
                <div className="counter-btn" onClick={plusClick}>
                  <div className="minus"></div>
                  <div className="plus"></div>
                </div>
              </div>
              <div className="item-container">
                <div className="item-label">Items:</div>
                <div className="item-count">{quantity}</div>
              </div>
              <div className="total-container">
                <div className="total-title">Total:</div>
                <div className="total-number">${product.price * quantity}</div>
              </div>
            </div>
          </div>
          <div className="item-btn-container">
            <button className={isAddedToCart ? "btn-buy-color" : "btn-buy-cart"} onClick={addToCartClick}>
              <span className={isAddedToCart ? "span-color" : "span-light"}>ADD TO CART</span>
              {isAddedToCart &&
              <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 1.08765L17.846 0L6.65537 10.7988L1.15395 5.49004L0 6.57769L6.65537 13L19 1.08765Z"
                      fill="white"/>
              </svg>}
            </button>
            <button className={product.favorite ? "btn-buy-fav-color" : "btn-buy-fav-lite"} onClick={likeClick}>
              <span className={product.favorite ? "span-color" : "span-light"}>ADD TO FAVORITES</span>
              {product.favorite &&
              <svg width="19" height="13" viewBox="0 0 19 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 1.08765L17.846 0L6.65537 10.7988L1.15395 5.49004L0 6.57769L6.65537 13L19 1.08765Z"
                      fill="white"/>
              </svg>}
            </button>
            <button className="btn-buy-nav" onClick={buyNowClick}>
              <span className="span-color">Buy now</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPopUp;
