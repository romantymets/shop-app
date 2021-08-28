import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productSelector,
  sortingSelector,
  fetchSorting,
  saveSortValue,
  tokenSelector
} from "../../store";
import ProductContainer from "../components/ProductContainer/ProductContainer";
import modalName from "../../constans/modalName";
import SearchAndCategory from "../../components/SearchAndCategoryContainer/SearchAndCategory";

const SortPage = () => {
  const [itemsNumber, setItemsNumber] = useState(0);
  const sortingValue = useSelector(sortingSelector);
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (sortingValue === modalName.popular) {
      dispatch(fetchSorting("popular", itemsNumber, token));
      dispatch(saveSortValue(modalName.popular));
    }
    if (sortingValue === modalName.latest) {
      dispatch(fetchSorting("latest", itemsNumber, token));
      dispatch(saveSortValue(modalName.latest));
    }
  }, [sortingValue, itemsNumber, token]);

  const loadMoreClick = (e) => {
    setItemsNumber(itemsNumber + 12);
  };

  const products = useSelector(productSelector) || [];
  return (
    <>
      <SearchAndCategory />
    <div className="home-container">
              <ProductContainer />
              {((products.length % 12) === 0) &&
              (<button className="load-more-btn" onClick={loadMoreClick}>
                <span>Load more...</span>
              </button>)
              }
    </div>
      </>
  );
};

export default SortPage;
