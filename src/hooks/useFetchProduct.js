import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProduct, tokenSelector } from "../store";

const useFetchProduct = (itemsNumber) => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  useEffect(() => {
    dispatch(fetchProduct(itemsNumber, token));
  }, [itemsNumber, token]);
};

export default useFetchProduct;
