import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSelector,
  avatarSelector,
  favouritesSelector,
  fetchFavoriteItems
  , tokenSelector
} from "../../store";
import "./FavouritesPage.css";
import FavouriteElement from "./FavouriteElement";

const FavouritesPage = () => {
  const history = useHistory();
  const token = useSelector(tokenSelector);
  const account = useSelector(accountSelector) || {};
  const avatar = useSelector(avatarSelector);
  const favourites = useSelector(favouritesSelector) || [];
  const dispatch = useDispatch();

  const [itemsNumber, setItemsNumber] = useState(0);
  const [showLoadMore, setShowLoadMore] = useState(true);

  const loadMoreClick = (e) => {
    setItemsNumber(itemsNumber + 12);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(fetchFavoriteItems(token, itemsNumber, () => {
        setShowLoadMore(false);
      }));
    }
  }, [token, itemsNumber]);

  return (
    <div className="account-wrap">
      <div className="account-img">
        <div>{avatar}</div>
      </div>
      <div className="account-text">
        <div>{account.fullName}</div>
      </div>
      <div className="checkout-container">
        <div className="account-lite-btn" onClick={() => history.push("/shop-app/myAccount")}>
          <span className="full-span">Edit Account</span>
        </div>
        <div className="account-lite-btn" onClick={() => history.push("/shop-app/orders")}>
          <span className="full-span">Orders History</span>
        </div>
        <div className="account-full-btn">
          <span className="lite-span">Favourites</span>
          <div className="box arrow-bottom">
          </div>
        </div>
      </div>
      <div className="favorites-container">
        <ul className="product-container">
          {favourites.map(element => (
            <FavouriteElement element={element} key={element.id}/>
          ))}
        </ul>
      </div>
      {showLoadMore && <button className="load-more-btn" onClick={loadMoreClick}>
        <span>Load more...</span>
      </button>}
    </div>
  );
};

export default FavouritesPage;
