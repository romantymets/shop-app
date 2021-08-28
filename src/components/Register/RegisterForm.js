import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegistrations, changeBlur, showAndHidePortal } from "../../store";
import errors from "../../constans/errors";
import modalName from "../../constans/modalName";
import { CloseSvg } from "../icons/Icons";
import { NAME_REG, PHONE_REG, EMAIL_REG, PASSWORD_REG } from "../../constans/regexps";
import { tokenSelector } from "../../store";
import Input from "../Input/Input";
import "./RegisterForm.css";

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
  email: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!EMAIL_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  },
  password: (str) => {
    if (str === "") {
      return errors.emptyField;
    }
    if (!PASSWORD_REG.test(str)) {
      return errors.incorrectField;
    } else return "";
  }
};

const RegisterForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(tokenSelector);

  const [values, setValue] = useState({
    name: "",
    number: "",
    email: "",
    password: ""
  });

  const [validations, setValidations] = useState({
    nameValid: "",
    numberValid: "",
    emailValid: "",
    passwordValid: ""
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

  const { name, number, email, password } = values;
  const { emailValid, nameValid, passwordValid, numberValid } = validations;
  const isFormError = emailValid || nameValid || passwordValid || numberValid;

  const onExistedEmail = () => {
    setValidations({ ...validations, emailValid: errors.emailIsUsed });
  };

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
  };

  useEffect(() => {
    if (token !== null) {
      closeModal();
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
    if (number === "") {
      return setValidations({
        ...validations,
        numberValid: errors.emptyField
      });
    }
    if (password === "") {
      return setValidations({
        ...validations,
        passwordValid: errors.emptyField
      });
    }
    const data = {
      fullName: name,
      email: email,
      password: password,
      phone: number
    };
    dispatch(asyncRegistrations(data, onExistedEmail));
  };

  const openLogin = () => {
    dispatch(showAndHidePortal(modalName.login));
    dispatch(changeBlur(true));
  };

  return (
    <>
      <div className="register-form-container">
        <div className="close-register"><span onClick={closeModal}> <CloseSvg/></span></div>
        <div className="register-form-and-title">
          <div className="register-form-title">
            Register
          </div>
          <form className="register-form" onSubmit={handleSubmit}>
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
            <div className="password-label">
              <span>The password has to be at least at least 1 letter, 1special symbol, 1 number </span>
            </div>
            <button type="submit" className="btn-register" disabled={isFormError}>
              <span className="btn-text">Register</span>
            </button>
          </form>
        </div>
      </div>
      <div className="register-form-invisible"></div>
      <div className="register-form-login">
        <div>
          <span className="login-text">I already have an account,</span>
          <span className="login-btn" onClick={openLogin}>Log In</span>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
