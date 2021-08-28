import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogin, changeBlur, showAndHidePortal, tokenSelector } from "../../store";
import errors from "../../constans/errors";
import { CloseSvg } from "../icons/Icons";
import { EMAIL_REG, PASSWORD_REG } from "../../constans/regexps";
import modalName from "../../constans/modalName";
import Input from "../Input/Input";
import "./LoginForm.css";

const validationsMap = {
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

const LoginForm = () => {
  const token = useSelector(tokenSelector);
  const dispatch = useDispatch();
  const [values, setValue] = useState({
    email: "",
    password: ""
  });

  const [validations, setValidations] = useState({
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

  const { email, password } = values;
  const { emailValid, passwordValid } = validations;
  const isFormError = emailValid || passwordValid;

  const closeModal = () => {
    dispatch(showAndHidePortal(null));
    dispatch(changeBlur(false));
  };

  useEffect(() => {
    if (token !== null) {
      closeModal();
    }
  }, [token]);

  const onIncorrectData = () => {
    setValidations({ ...validations, emailValid: errors.emailOrPassword, passwordValid: errors.emailOrPassword });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "") {
      return setValidations({
        ...validations,
        emailValid: errors.emptyField
      });
    }
    if (password === "") {
      return setValidations({
        ...validations,
        passwordValid: errors.emptyField
      });
    }
    const data = {
      email: email,
      password: password
    };
    dispatch(asyncLogin(data, onIncorrectData));
  };

  const openRegister = () => {
    dispatch(showAndHidePortal(modalName.registrations));
    dispatch(changeBlur(true));
  };

  return (
    <>
      <div className="login-form-container">
        <div className="close-login"><span onClick={closeModal}> <CloseSvg/></span></div>
        <div className="login-form-and-title">
          <div className="login-form-title">
            Login
          </div>
          <form className="login-form" onSubmit={handleSubmit}>
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
              className={password === "" ? "floating-label" : "floating-label-full"}
              inputValue={password}
              errorMessage={passwordValid}
              onChange={onChange}
              type={"password"}
              name={"password"}
              inputText={"Password"}
              isPassword
            />
            <button type="submit" className="btn-login" disabled={isFormError}>
              <span className="btn-text">Login</span>
            </button>
          </form>
        </div>
      </div>
      <div className="login-form-invisible"></div>
      <div className="login-form-login">
        <div>
          <span className="login-text">I have no account,</span>
          <span className="login-btn" onClick={openRegister}>Register now</span>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
