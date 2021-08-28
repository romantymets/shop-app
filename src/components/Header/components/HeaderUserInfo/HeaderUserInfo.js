import React, { useRef, useEffect, useState } from "react";
import { Tick } from "../../../icons/Icons";
import { useDispatch, useSelector } from "react-redux";
import { accountSelector, avatarSelector, saveAvatar } from "../../../../store";
import { UserInfoModal } from "./components/UserInfoModal/UserInfoModal";

export const HeaderUserInfo = () => {
  const account = useSelector(accountSelector);
  const avatar = useSelector(avatarSelector);
  const dispatch = useDispatch();
  const { fullName = "" } = account || {};
  const wrapperRef = useRef(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowModal(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const generateIcon = (userName) => {
    if (userName !== "") {
      const accountName = userName.split(" ");
      const [name, surname] = accountName;
      if (!surname) {
        return name[0].toUpperCase();
      } else {
        return name[0].toUpperCase() + surname[0].toUpperCase();
      }
    } else return "";
  };

  useEffect(() => {
    dispatch(saveAvatar(generateIcon(fullName)));
  }, [fullName]);

  const generateName = (userName) => {
    if (userName !== "") {
      const accountName = userName.split(" ");
      const [name = ""] = accountName;
      return name;
    } else return "";
  };

  const onButtonClick = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="info-container" ref={wrapperRef}>
      <div className="user-ifo-text"><span> Welcome, {generateName(fullName)}!</span></div>
      <div className="user-info-img" onClick={onButtonClick}>
        <div className="text">{avatar}</div>
      </div>
      <div className="tick-img" onClick={onButtonClick}><Tick/></div>
      {showModal ? <UserInfoModal/> : null}
    </div>
  );
};
