import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input/Input";
import errors from "../../constans/errors";
import { NAME_REG, PHONE_REG } from "../../constans/regexps";
import CartProductItems from "./components/CartProductItem";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSelector,
  cartSelector,
  locationsAction,
  locationsSelector,
  orderPostAction,
  tokenSelector
} from "../../store";
import classNames from "classnames";
import ErrorMessage from "../../components/Register/ErrorMessage";
import "./Cart.css";

const validationsMap = {
  name: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!NAME_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  number: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!PHONE_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  country: (str) => {
    if (str === "") {
      return errors.emptyField;
    } else return "";
  },
  city: (str) => {
    if (str === "") {
      return errors.emptyField;
    } else return "";
  },
  address: (str) => {
    if (str === "") {
      return errors.emptyField;
    } else return "";
  }
};

const Cart = () => {
  const carts = useSelector(cartSelector) || [];
  const account = useSelector(accountSelector) || {};
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const locations = useSelector(locationsSelector);
  const [quantity, setQuantity] = useState(0);
  const [total, setTotal] = useState(0);
  const history = useHistory();

  useEffect(() => {
    dispatch(locationsAction());
  }, []);

  useEffect(() => {
    let counter = 0;
    let allPrice = 0;
    const newCarts = carts || [];
    newCarts.forEach((el) => {
      counter = el.quantity + counter;
      allPrice = el.price * el.quantity + allPrice;
    });
    setQuantity(counter);
    setTotal(allPrice);
  }, [carts]);

  const [values, setValue] = useState({
    name: account.fullName || "",
    number: account.phone || "",
    country: "",
    city: "",
    address: ""
  });

  const [validations, setValidations] = useState({
    nameValid: "",
    numberValid: "",
    cityValid: "",
    addressValid: "",
    countryValid: ""
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue({
      ...values,
      [name]: value
    });
    setValidations({
      ...validations,
      [`${name}Valid`]: validationsMap[name](value)
    });
  };

  const { name, number, country, city, address } = values;
  const { numberValid, nameValid, cityValid, addressValid, countryValid } = validations;
  const isFormError = cityValid || nameValid || addressValid || numberValid || countryValid || carts.length === 0;

  const dataToOrder = () => {
    const items = carts.map((el) => {
      return {
        productId: el.id,
        quantity: el.quantity
      };
    });

    const shipment = {
      fullName: name,
      phone: number,
      country: country,
      city: city,
      address: address
    };

    return {
      items,
      shipment
    };
  };

  const handleSubmit = (e) => {
    if (name === "") {
      return setValidations({
        ...validations,
        nameValid: errors.emptyField
      });
    }
    if (country === "") {
      return setValidations({
        ...validations,
        countryValid: errors.emptyField
      });
    }
    if (number === "") {
      return setValidations({
        ...validations,
        numberValid: errors.emptyField
      });
    }
    if (city === "") {
      return setValidations({
        ...validations,
        cityValid: errors.emptyField
      });
    }
    if (address === "") {
      return setValidations({
        ...validations,
        addressValid: errors.emptyField
      });
    }
    dispatch(orderPostAction(token, dataToOrder()));
  };

  return (
    <div className="cart-wrap">
      <div className="cart-title">
        My cart
      </div>
      <div className="cart-body">
        <ul className="cart-products">
         {carts.length === 0 ? <div>There are no items in a cart</div> : null}
          {carts.map(product => (
          <CartProductItems product={product}/>
          ))}
        </ul>
        <div className="cart-line"/>

        <div className="cart-config">
          <Input
            className={name === "" ? "floating-label" : "floating-label-full"}
            inputValue={name}
            errorMessage={nameValid}
            onChange={onChange}
            type={"text"}
            name={"name"}
            inputText={"Full Name"}
          />
          <Input
            className={number === "" ? "floating-label" : "floating-label-full"}
            inputValue={number}
            errorMessage={numberValid}
            onChange={onChange}
            type={"text"}
            name={"number"}
            inputText={"Phone number"}
          />
          <div className="input">
          <select className={classNames("form-select shadow-none border-0", "category-select")}
                  aria-label="Default select example"
                  value={country}
                  onChange={onChange}
                  name={"country"}
          >
            <optgroup className="option">
              <option value="" disabled defaultValue="Choose Locations" hidden>Choose Locations</option>
              {locations.map((option) => (
                <option value={option} key={option}>{option}</option>
              ))}
            </optgroup>
          </select>
            {countryValid && <ErrorMessage error={countryValid}/>}
          </div>
          <Input
            className={city === "" ? "floating-label" : "floating-label-full"}
            inputValue={city}
            errorMessage={cityValid}
            onChange={onChange}
            type={"text"}
            name={"city"}
            inputText={"City"}
          />
          <Input
            className={address === "" ? "floating-label" : "floating-label-full"}
            inputValue={address}
            errorMessage={addressValid}
            onChange={onChange}
            type={"text"}
            name={"address"}
            inputText={"Address"}
          />

          <div className="item-container">
          <span className="item-label">
            Items
          </span>
            <span className="items-count">
              {quantity}
          </span>
          </div>
          <div className="total-cart-container">
                <span className="total-title">
             Total
             </span>
            <span className="total-cart-count">
                   {`$ ${total}`}
            </span>
        </div>
          <div className="favourites-btn-container">
            <button className="btn-favourite" disabled={isFormError} onClick={handleSubmit}>
              <span>Confirms the purchase</span>
            </button>
            <button className="favourite-lite" onClick={() => history.push("/shop-app")}>
              <span>Continue shopping</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
