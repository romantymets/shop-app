import React, { useEffect } from "react";
import classNames from "classnames";
import { Flag, SearchSvg, ListSvg } from "../icons/Icons";
import useSearch from "../../hooks/useSearch";
import useCategory from "../../hooks/useCategory";
import useSorting from "../../hooks/useSorting";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories, sortingSelector, categorySelector } from "../../store";
import "./SearchAndCategory.css";

const SearchAndCategory = () => {
  const dispatch = useDispatch();
  const categoryTitle = useSelector(categorySelector);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const sortingValue = useSelector(sortingSelector);

  const [handleChangeSorting, clearSorting] = useSorting();

  const [options, selectedCategory, handleChangeCategory] = useCategory();

  const [onChange, searchRef, searchValue] = useSearch();

  const sortingOptions = [{ value: "Popular", label: " Popular" }, { value: "New", label: " New" }];

  return (
    <div className="search-and-category">
      <div className={classNames("input", "input-search")}>
        <span className="svg-search"><SearchSvg/></span>
        <input ref={searchRef} onChange={onChange} type="search"
               value={searchValue}
               placeholder="Search products by name"
        />
      </div>
      <div className={searchValue !== "" ? "hide" : classNames("input", "input-category")}>
        <div className="svg"><ListSvg/></div>
        <select className={classNames("form-select shadow-none border-0", "category-select")}
                aria-label="Default select example"
                value={selectedCategory}
                onChange={handleChangeCategory}
        >
          {categoryTitle === "Choose Category" && <option defaultValue={categoryTitle} disabled hidden>{categoryTitle}</option>
          }
          {options.map((option, index) => (
            <option className="option" value={option.value} id={option.id}
                    key={`${options.id}-${index}`}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className={searchValue !== "" ? "hide" : classNames("input", "input-sorting")}>
        <div className="svg"><Flag/></div>
        <select className={classNames("form-select shadow-none border-0", "category-select")}
                aria-label="Default select example"
                value={sortingValue}
                onChange={handleChangeSorting}>
          <optgroup className="option">
            {sortingValue === "Sorting" && <option defaultValue="Sorting" disabled hidden>Sorting</option>}
            {sortingOptions.map((option, index) => (
              <option value={option.value} key={`${options.value}-${index}`}>{option.label}</option>
            ))}
          </optgroup>
        </select>
        {sortingValue !== "Sorting"
          ? <div className="svg-close" onClick={clearSorting}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 1.20857L10.7914 0L6 4.79143L1.20857 0L0 1.20857L4.79143 6L0 10.7914L1.20857 12L6 7.20857L10.7914 12L12 10.7914L7.20857 6L12 1.20857Z"
                fill="#707070"
              />
            </svg>
          </div>
          : null}
      </div>
    </div>
  );
};
export default SearchAndCategory;
