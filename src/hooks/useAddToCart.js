import { useEffect } from "react";
import { useSelector } from "react-redux";
import { cartSelector, tokenSelector } from "../store";

const useAddToCart = () => {
  const cart = useSelector(cartSelector);
  const token = useSelector(tokenSelector);

  useEffect(() => {
    if (!token) {
      return;
    }
    const sesCart = sessionStorage.getItem("cart");
    if (!sesCart) {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    } else {
      sessionStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);
};
export default useAddToCart;
