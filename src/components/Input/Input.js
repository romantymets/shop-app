import React, { useState } from "react";
import classNames from "classnames";
import ErrorMessage from "../Register/ErrorMessage";
import { Eye, EyeCrossedOut } from "../icons/Icons";
import "./Input.css";

const Input = ({ className, errorMessage, name, inputValue, type, onChange, isPassword, inputText }) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = isPassword ? ((!showPassword && type) || "text") : type;
  return (
    <div
      className={classNames("input", { "input-errors": (errorMessage !== undefined && errorMessage !== "") })}
    >
      <label className={classNames(className)}>{inputText}</label>
      <input type={inputType} name={name} onChange={onChange} value={inputValue}/>
      {errorMessage && <ErrorMessage error={errorMessage}/>}
      {isPassword &&
      <div onClick={(e) => setShowPassword(!showPassword)}>
        {showPassword ? <EyeCrossedOut/> : <Eye/>}
      </div>
      }
    </div>
  );
};

export default Input;
