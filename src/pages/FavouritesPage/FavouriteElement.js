import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { EmptyHeart, FullHeart } from "../../components/icons/Icons";
import {
  saveFavourites,
  tokenSelector,
  deleteFavouritesIdAction,
  saveProduct,
  productSelector,
  favouritesSelector
} from "../../store";

const FavouriteElement = ({ element = {} }) => {
  const token = useSelector(tokenSelector);
  const products = useSelector(productSelector) || [];
  const favourites = useSelector(favouritesSelector) || [];
  const dispatch = useDispatch();

  const likeClick = (e) => {
    dispatch(deleteFavouritesIdAction(token, element.id));
    const index = products.findIndex(el => el.id === element.id);
    const newProducts = [...products];
    newProducts.splice(index, 1, { ...element, favorite: !element.favorite });
    dispatch(saveProduct(newProducts));
    dispatch(saveFavourites(favourites.filter(el => element.id !== el.id)));
  };

  return (
    <li className="product-list" key={element.id}>
      <div className="product-img">
        <img src={element.picture} alt="loading" width="201px" height="147px"/>
      </div>
      <div className="product-heart" onClick={likeClick}>{element.favorite ? <FullHeart/> : <EmptyHeart/>}</div>
      <div className="product-title">
        <p> {element.title}</p>
      </div>
      <div className="product-price">
        $ {element.price}
      </div>
    </li>
  );
};

export default FavouriteElement;
