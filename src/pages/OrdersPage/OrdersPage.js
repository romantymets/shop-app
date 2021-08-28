import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSelector,
  avatarSelector,
  ordersSelector,
  ordersGetAction,
  tokenSelector
} from "../../store";
import "./OrdersPage.css";
import OrderElement from "./OrderElement";

const OrdersPage = () => {
  const history = useHistory();
  const token = useSelector(tokenSelector);
  const account = useSelector(accountSelector) || {};
  const avatar = useSelector(avatarSelector);
  const orders = useSelector(ordersSelector) || [];
  const dispatch = useDispatch();

  const [itemsNumber, setItemsNumber] = useState(0);

  const loadMoreClick = (e) => {
    setItemsNumber(itemsNumber + 12);
  };

  useEffect(() => {
    if (token !== null) {
      dispatch(ordersGetAction(token, itemsNumber));
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
        <div className="account-full-btn">
          <span className="lite-span">Orders History</span>
          <div className="box arrow-bottom">
          </div>
        </div>
        <div className="account-lite-btn" onClick={() => history.push("/shop-app/favourite")}>
          <span className="full-span">Favourites</span>
        </div>
      </div>
      <ul className="orders-container">
        {orders.length === 0 && <div> Currently you have no orders </div>}
        {
          orders.map(element => (<OrderElement element={element} key={element.id}/>))
        }
      </ul>
      {((orders.length % 12) === 0) &&
      (<button className="load-more-btn" onClick={loadMoreClick}>
        <span>Load more...</span>
      </button>)
      }
    </div>
  );
};

export default OrdersPage;
