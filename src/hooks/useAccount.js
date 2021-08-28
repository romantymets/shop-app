import { useDispatch, useSelector } from "react-redux";
import {
  tokenSelector,
  fetchAccountAction
} from "../store";
import { useEffect } from "react";

const useAccount = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);
  useEffect(() => {
    if (token !== null) {
      dispatch(fetchAccountAction(token));
    }
  }, [token]);
};

export default useAccount;
