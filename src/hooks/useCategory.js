import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  categoriesSelector,
  saveCategory,
  categorySelector,
  saveCategoryId, saveSortValue
} from "../store";

const useCategory = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const categories = useSelector(categoriesSelector);
  const selectedCategory = useSelector(categorySelector);

  const getOptions = (list = []) => {
    const listOptions = list.map(el => Object.create({ value: el.name, label: el.name, id: el.id }));
    return [{ value: "All", label: " All", id: 11 }, ...listOptions];
  };

  const options = getOptions(categories);

  const handleChangeCategory = (e) => {
    const value = e.target.value;
    if (value === "All") {
      history.push("/shop-app");
      dispatch(saveCategory("Choose Category"));
      dispatch(saveCategoryId(""));
    } else {
      const findElement = options.find(el => el.value === value);
      dispatch(saveCategory(value));
      dispatch(saveSortValue("Sorting"));
      dispatch(saveCategoryId(findElement.id));
      history.push(`/shop-app/categories/${value}`);
    }
  };

  return [options, selectedCategory, handleChangeCategory];
};

export default useCategory;
