import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryIdSelector,
  fetchCategoriesListItems,
  productSelector,
  saveCategory,
  categorySelector,
  tokenSelector
} from "../../store";
import ProductContainer from "../components/ProductContainer/ProductContainer";
import CategoryNotFound from "./CategoryNotFound";
import SearchAndCategory from "../../components/SearchAndCategoryContainer/SearchAndCategory";

const CategoryPage = () => {
  const [itemsNumber, setItemsNumber] = useState(0);
  const token = useSelector(tokenSelector);
  const selectedId = useSelector(categoryIdSelector);
  const selectedCategory = useSelector(categorySelector);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedCategory === "All") {
      history.push("/shop-app");
      dispatch(saveCategory(""));
    }
    if (selectedCategory !== "All") {
      dispatch(fetchCategoriesListItems(selectedId, itemsNumber, token));
      dispatch(saveCategory(selectedCategory));
    }
  }, [itemsNumber, selectedCategory, token]);

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
            ? <CategoryNotFound/>
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

export default CategoryPage;
