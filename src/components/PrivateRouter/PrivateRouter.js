import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { tokenSelector } from "../../store";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const token = useSelector(tokenSelector);
  return (
    <Route {...rest} render={props => (
      token
        ? <Component {...props} />
        : <Redirect to="/shop-app"/>
    )}/>
  );
};

export default PrivateRoute;
