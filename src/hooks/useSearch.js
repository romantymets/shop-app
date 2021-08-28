import { useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveSearch, searchSelector } from "../store";
import { useDebounce } from "use-debounce";

const useSearch = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const search = useSelector(searchSelector);
  const locations = useLocation();
  const [searchValue, setSearchValue] = useState(search);
  const [value] = useDebounce(searchValue, 300);
  const searchRef = useRef();

  const onChange = (e) => setSearchValue(e.target.value);

  useEffect(() => {
    if (value.length !== 0) {
      dispatch(saveSearch(value));
      history.push(`/shop-app/search/?=${value}`);
      searchRef.current.focus();
    }
    if (value.length === 0 && locations.pathname === "/shop-app/search/") {
      dispatch(saveSearch(""));
      history.push("/shop-app");
    }
  }, [value]);

  return [onChange, searchRef, searchValue, value];
};

export default useSearch;
