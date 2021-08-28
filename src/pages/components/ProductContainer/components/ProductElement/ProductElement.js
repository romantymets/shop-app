import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyHeart, FullHeart } from "../../../../../components/icons/Icons";
import modalName from "../../../../../constans/modalName";
import {
  changeBlur,
  showAndHidePortal,
  tokenSelector,
  postFavouritesIdAction,
  deleteFavouritesIdAction,
  singleProductAction, saveProduct, productSelector
} from "../../../../../store";
import "./ProductElement.css";

const ProductElement = ({ element = {} }) => {
  const token = useSelector(tokenSelector);
  const products = useSelector(productSelector);
  const dispatch = useDispatch();

  const openProductModal = () => {
    dispatch(singleProductAction(element.id, token));
    dispatch(showAndHidePortal(modalName.product));
    dispatch(changeBlur(true));
  };

  const likeClick = (e) => {
    e.stopPropagation();
    if (token === null) {
      dispatch(showAndHidePortal(modalName.notRegister));
      dispatch(changeBlur(true));
      return;
    }
    if (element.favorite) {
      dispatch(deleteFavouritesIdAction(token, element.id));
    } else {
      dispatch(postFavouritesIdAction(token, element.id));
    }
    dispatch(singleProductAction(element.id, token));
    const index = products.findIndex(el => el.id === element.id);
    const newProducts = [...products];
    newProducts.splice(index, 1, { ...element, favorite: !element.favorite });
    dispatch(saveProduct(newProducts));
  };

  return (
    <li className="product-list" key={element.id} onClick={openProductModal}>
      <div className="product-img">
        <img src={element.picture} alt="loading" width="201px" height="147px"/>
      </div>
      <div className="product-heart" onClick={likeClick}>
        {element.favorite ? <FullHeart/> : <EmptyHeart/>}
      </div>
      <div className="product-title">
        <p> {element.title}</p>
      </div>
      <div className="product-price">
        $ {element.price}
      </div>
    </li>
  );
};

export default ProductElement;
