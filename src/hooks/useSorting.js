import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { saveCategory, saveSortValue } from "../store";

const useSorting = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChangeSorting = (e) => {
    const value = e.target.value;
    dispatch(saveSortValue(value));
    history.push(`/shop-app/sort/${value}`);
    dispatch(saveCategory("Choose Category"));
  };

  const clearSorting = () => {
    dispatch(saveSortValue("Sorting"));
    dispatch(saveCategory("Choose Category"));
    history.push("/shop-app");
  };

  return [handleChangeSorting, clearSorting];
};

export default useSorting;
