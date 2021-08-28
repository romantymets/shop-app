import React from "react";
import { useSelector } from "react-redux";
import { productSelector } from "../../../store";
import ProductElement from "./components/ProductElement/ProductElement";
import "./ProductContainer.css";

const ProductContainer = () => {
  const products = useSelector(productSelector);

  const productList = products || [];

  return (
    <ul className="product-container">
      {productList.map(el => (<ProductElement element={el} key={el.id}/>))}
    </ul>
  );
};

export default ProductContainer;
