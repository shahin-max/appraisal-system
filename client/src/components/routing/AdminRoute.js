import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !(user && user.role === 'admin') ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default AdminRoute;
