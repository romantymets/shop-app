import {
  fetchRegistrations,
  fetchProductData,
  fetchLogin,
  fetchFavoriteList,
  Search,
  fetchProductCategories,
  fetchCategoriesList,
  asyncSort,
  fetchSingleItem,
  postFavouritesId,
  deleteFavouritesId,
  fetchAccount,
  fetchLocation,
  postOrder,
  putAccount,
  putAccountPassword,
  getOrders
} from "../Api/api";
import { accountUpdate, passwordUpdate, saveAccount } from "./accountSlice";
import { saveToken } from "./tokenSlice";
import { saveProduct, saveSingleProduct, loadMoreProduct } from "./productSlice";
import { saveCategories } from "./categorySlice";
import { showAndHidePortal, changeBlur } from "./modalSlice";
import { saveFavourites, loadMoreFavourites } from "./favouritesSlice";
import { saveLocations, saveOrder, saveOrders, loadMoreOrders } from "./cartSlice";
import modalName from "../constans/modalName";

export const asyncRegistrations = (payload, onExistedEmail) => (dispatch) => {
  fetchRegistrations(payload, onExistedEmail)
    .then((response) => {
      if (!response) {
        return;
      }
      const { token, account } = response;
      localStorage.setItem("token", token);
      dispatch(saveToken(token));
      dispatch(saveAccount(account));
    })
    .catch(error => console.log(error));
};

export const asyncLogin = (payload, onIncorrectData) => (dispatch) => {
  fetchLogin(payload, onIncorrectData)
    .then((response) => {
      if (!response) {
        return;
      }
      localStorage.setItem("token", response.token);
      dispatch(saveToken(response.token));
      dispatch(saveAccount(response.account));
    })
    .catch(error => console.log(error));
};

export const fetchProduct = (payload, token) => (dispatch) => {
  if (payload === 0) {
    fetchProductData(payload, token)
      .then((response) => {
        dispatch(saveProduct(response));
      }).catch(error => console.log(error));
  } else {
    fetchProductData(payload, token)
      .then((response) => {
        dispatch(loadMoreProduct(response));
      }).catch(error => console.log(error));
  }
};

export const asyncSearch = (offset, payload, token) => (dispatch) => {
  dispatch(showAndHidePortal(modalName.spinner));
  dispatch(changeBlur(true));
  if (offset === 0) {
    Search(offset, payload, token)
      .then((response) => {
        dispatch(saveProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  } else {
    Search(offset, payload, token)
      .then((response) => {
        dispatch(loadMoreProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  }
};

export const fetchFavoriteItems = (token, offset, onNoMore) => (dispatch) => {
  if (offset === 0) {
    fetchFavoriteList(token, offset)
      .then((response) => {
        dispatch(saveFavourites(response));
      }).catch(error => console.log(error));
  } else {
    fetchFavoriteList(token, offset)
      .then((response) => {
        if (response.length === 0) {
          return onNoMore && onNoMore();
        }
        dispatch(loadMoreFavourites(response));
      }).catch(error => console.log(error));
  }
};

export const fetchCategories = () => (dispatch) => {
  fetchProductCategories()
    .then((response) => {
      dispatch(saveCategories(response));
    }).catch(error => console.log(error));
};

export const fetchCategoriesListItems = (id, offset, token) => (dispatch) => {
  dispatch(showAndHidePortal(modalName.spinner));
  dispatch(changeBlur(true));
  if (offset === 0) {
    fetchCategoriesList(id, offset, token)
      .then((response) => {
        dispatch(saveProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  } else {
    fetchCategoriesList(id, offset, token)
      .then((response) => {
        dispatch(loadMoreProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  }
};

export const fetchSorting = (filter, offset, token) => (dispatch) => {
  dispatch(showAndHidePortal(modalName.spinner));
  dispatch(changeBlur(true));
  if (offset === 0) {
    asyncSort(filter, offset, token)
      .then((response) => {
        dispatch(saveProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  } else {
    asyncSort(filter, offset, token)
      .then((response) => {
        dispatch(loadMoreProduct(response));
        dispatch(showAndHidePortal(""));
        dispatch(changeBlur(false));
      }).catch(error => console.log(error));
  }
};

export const singleProductAction = (id, token) => (dispatch) => {
  fetchSingleItem(id, token)
    .then((response) => {
      dispatch(saveSingleProduct(response));
    }).catch(error => console.log(error));
};

export const postFavouritesIdAction = (token, id) => (dispatch) => {
  postFavouritesId(token, id)
    .then((response) => {
      if (!response) {

      }
    }).catch(error => console.log(error));
};

export const deleteFavouritesIdAction = (token, id) => (dispatch) => {
  deleteFavouritesId(token, id)
    .then((response) => {
      if (!response) {

      }
    }).catch(error => console.log(error));
};

export const fetchAccountAction = (token) => (dispatch) => {
  fetchAccount(token)
    .then((response) => {
      dispatch(saveAccount(response));
    }).catch(error => console.log(error));
};
export const locationsAction = () => (dispatch) => {
  fetchLocation()
    .then((response) => {
      dispatch(saveLocations(response));
    }).catch(error => console.log(error));
};

export const orderPostAction = (token, data) => (dispatch) => {
  postOrder(token, data)
    .then((response) => {
      if (!response) {
        return;
      }
      dispatch(saveOrder(response));
      dispatch(showAndHidePortal(modalName.successfulPurchase));
      dispatch(changeBlur(true));
    })
    .catch(error => console.log(error));
};

export const accountPutAction = (token, data) => (dispatch) => {
  putAccount(token, data)
    .then((response) => {
      if (!response) {
        return;
      }
      dispatch(saveAccount(response));
      dispatch(accountUpdate("account update"));
    })
    .catch(error => console.log(error));
};

export const passwordChangePutAction = (token, data) => (dispatch) => {
  putAccountPassword(token, data)
    .then((response) => {
      if (!response) {
        return;
      }
      dispatch(passwordUpdate("password update"));
    })
    .catch(error => console.log(error));
};

export const ordersGetAction = (token, offset) => (dispatch) => {
  if (offset === 0) {
    getOrders(token, offset)
      .then((response) => {
        if (!response) {
          return;
        }
        dispatch(saveOrders(response));
      })
      .catch(error => console.log(error));
  } else {
    getOrders(token, offset)
      .then((response) => {
        if (!response) {
          return;
        }
        dispatch(loadMoreOrders(response));
      })
      .catch(error => console.log(error));
  }
};
