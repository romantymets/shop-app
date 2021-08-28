import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSearch, productSelector, searchSelector, tokenSelector } from "../../store";
import ProductContainer from "../components/ProductContainer/ProductContainer";
import SearchNotFound from "../components/SearchNotFound/SearchNotFound";
import SearchAndCategory from "../../components/SearchAndCategoryContainer/SearchAndCategory";

const SearchPage = () => {
  const token = useSelector(tokenSelector);
  const [itemsNumber, setItemsNumber] = useState(0);
  const dispatch = useDispatch();
  const value = useSelector(searchSelector);

  useEffect(() => {
    if (value.length > 2) {
      dispatch(asyncSearch(itemsNumber, value.toLowerCase(), token));
    }
  }, [value, itemsNumber, token]);

  const loadMoreClick = (e) => {
    setItemsNumber(itemsNumber + 12);
  };

  const products = useSelector(productSelector) || [];
  return (
    <>
      <SearchAndCategory/>
      <div className="home-container">
        {
          (products.length === 0)
            ? <SearchNotFound/>
            : (
              <>
                <ProductContainer/>
                {((products.length % 12) === 0) &&
                (<button className="load-more-btn" onClick={loadMoreClick}>
                  <span>Load more...</span>
                </button>)
                }
              </>
              )
        }
      </div>
    </>
  );
};

export default SearchPage;
