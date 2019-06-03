import React from "react";
import { Route, Link } from "react-router-dom";

const CustomLink = props => {
  return (
    <Route
      path={props.to}
      exact={props.activeOnlyWhenExact}
      children={({ match }) => (
        <div className={match ? "active" : ""}>
          <Link to={props.to}>{props.children}</Link>
        </div>
      )}
    />
  );
};

export default CustomLink;
