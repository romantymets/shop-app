import React, { useState } from "react";
import { useSelector } from "react-redux";
import { productSelector } from "../../store";
import ProductContainer from "../components/ProductContainer/ProductContainer";
import useFetchProduct from "../../hooks/useFetchProduct";
import SearchAndCategory from "../../components/SearchAndCategoryContainer/SearchAndCategory";
import "./Home.css";

const HomePage = () => {
  const [itemsNumber, setItemsNumber] = useState(0);

  const loadMoreClick = (e) => {
    setItemsNumber(itemsNumber + 12);
  };

  useFetchProduct(itemsNumber);

  const product = useSelector(productSelector) || [];
  return (
    <div>
      <SearchAndCategory/>
      <div className="home-container">
        <ProductContainer/>
        {((product.length % 12) === 0) &&
        (<button className="load-more-btn" onClick={loadMoreClick}>
          <span>Load more...</span>
        </button>)
        }
      </div>
    </div>
  );
};

export default HomePage;
