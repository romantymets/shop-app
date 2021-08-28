import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input/Input";
import errors from "../../constans/errors";
import { EMAIL_REG, NAME_REG, PASSWORD_REG, PHONE_REG } from "../../constans/regexps";
import { useDispatch, useSelector } from "react-redux";
import {
  accountSelector, avatarSelector,
  locationsAction,
  locationsSelector,
  accountPutAction,
  tokenSelector,
  passwordChangePutAction
} from "../../store";
import classNames from "classnames";
import ErrorMessage from "../../components/Register/ErrorMessage";
import "./MyAccountPage.css";

const validationsMapAccount = {
  name: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!NAME_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  email: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!EMAIL_REG.test(str)) {
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
  },
  password: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!PASSWORD_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  newPassword: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!PASSWORD_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  confirmPassword: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!PASSWORD_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  }
};

const MyAccountPage = () => {
  const account = useSelector(accountSelector) || {};
  const avatar = useSelector(avatarSelector);
  const token = useSelector(tokenSelector);
  const history = useHistory();
  const dispatch = useDispatch();
  const locations = useSelector(locationsSelector) || [];

  useEffect(() => {
    dispatch(locationsAction());
  }, []);

  const [values, setValue] = useState({
    name: account.fullName || "",
    number: account.phone || "",
    country: "",
    city: "",
    address: "",
    email: account.email || "",
    password: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [validations, setValidations] = useState({
    nameValid: "",
    numberValid: "",
    cityValid: "",
    addressValid: "",
    countryValid: "",
    emailValid: "",
    passwordValid: "",
    newPasswordValid: "",
    confirmPasswordValid: ""
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setValue({
      ...values,
      [name]: value
    });
    setValidations({
      ...validations,
      [`${name}Valid`]: validationsMapAccount[name](value)
    });
  };

  const { name, number, country, city, address, email, password, confirmPassword, newPassword } = values;
  const { numberValid, nameValid, cityValid, addressValid, countryValid, emailValid, passwordValid, newPasswordValid, confirmPasswordValid } = validations;
  const isFormErrorAccount = cityValid || nameValid || addressValid || numberValid || countryValid || emailValid;
  const isFormErrorPassword = passwordValid || newPasswordValid || confirmPasswordValid;

  const handleSubmitAccount = (e) => {
    if (name === "") {
      return setValidations({
        ...validations,
        nameValid: errors.emptyField
      });
    }
    if (email === "") {
      return setValidations({
        ...validations,
        emailValid: errors.emptyField
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
    const data = {
      fullName: name,
      email: email,
      phone: number,
      country: country,
      city: city,
      address: address
    };
    dispatch(accountPutAction(token, data));
  };
  const handleSubmitPassword = (e) => {
    if (password === "") {
      return setValidations({
        ...validations,
        passwordValid: errors.emptyField
      });
    }
    if (newPassword === "") {
      return setValidations({
        ...validations,
        newPasswordValid: errors.emptyField
      });
    }
    if (confirmPassword === "") {
      return setValidations({
        ...validations,
        confirmPasswordValid: errors.emptyField
      });
    }
    if (confirmPassword !== newPassword) {
      return setValidations({
        ...validations,
        confirmPasswordValid: errors.passwordDontMatch
      });
    }
    const data = {
      oldPassword: password,
      password: confirmPassword
    };
    dispatch(passwordChangePutAction(token, data));
    setValue((prev) => {
      return {
        ...prev,
        password: "",
        newPassword: "",
        confirmPassword: ""
      };
    });
    setValidations((prev) => {
      return {
        ...prev,
        passwordValid: "",
        newPasswordValid: "",
        confirmPasswordValid: ""
      };
    });
  };

  return (
    <div className="account-wrap">
      <div className="account-img">
        <div>{avatar}</div>
      </div>
      <div className="account-text">
        <div>{account.fullName || ""}</div>
      </div>
      <div className="checkout-container">
        <div className="account-full-btn">
          <span className="lite-span">Edit Account</span>
          <div className="box arrow-bottom">
          </div>
        </div>
        <div className="account-lite-btn"><span className="full-span" onClick={() => history.push("/shop-app/orders")}>Orders History</span>
        </div>
        <div className="account-lite-btn"><span className="full-span"
                                                onClick={() => history.push("/shop-app/favourite")}>Favourites</span></div>
      </div>
      <div className="account-input-container">
        <div className="more-inf"> Main information</div>
        <div className="account-config">
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
            className={email === "" ? "floating-label" : "floating-label-full"}
            inputValue={email}
            errorMessage={emailValid}
            onChange={onChange}
            type={"email"}
            name={"email"}
            inputText={"Email"}
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
                {locations.map((option, index) => (
                  <option value={option} key={`${option}-${index}`}>{option}</option>
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
          <button className="btn-account-full" disabled={isFormErrorAccount} onClick={handleSubmitAccount}>
            <span className="lite-span">Confirms the purchase</span>
          </button>
        </div>
        <div className="more-inf"> Change password</div>
        <div className="account-config">
          <Input
            className={password === "" ? "floating-label" : "floating-label-full"}
            errorMessage={passwordValid}
            onChange={onChange}
            inputValue={password}
            type={"password"}
            name={"password"}
            inputText={"Password"}
            isPassword
          />
          <Input
            className={newPassword === "" ? "floating-label" : "floating-label-full"}
            errorMessage={newPasswordValid}
            onChange={onChange}
            inputValue={newPassword}
            type={"password"}
            name={"newPassword"}
            inputText={"New Password"}
            isPassword
          />
          <Input
            className={confirmPassword === "" ? "floating-label" : "floating-label-full"}
            errorMessage={confirmPasswordValid}
            onChange={onChange}
            inputValue={confirmPassword}
            type={"password"}
            name={"confirmPassword"}
            inputText={"Confirm Password"}
            isPassword
          />
          <button className="btn-passw-full" disabled={isFormErrorPassword} onClick={handleSubmitPassword}>
            <span className="lite-span">Change password</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
