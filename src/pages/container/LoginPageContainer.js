import React from "react";
import { Mutation } from "react-apollo";

import LoginPage from "../LoginPage";

import { LOGIN_USER } from "../../graphql/mutation/loginMutation";

const LoginPageContainer = props => {
  return (
    <Mutation
      mutation={LOGIN_USER}
      onCompleted={({ login }) => {
        localStorage.setItem("token", login.token);
        localStorage.setItem("user", JSON.stringify(login.user));
        props.history.push("/home");
      }}
    >
      {(login, { error }) => {
        return (
          <LoginPage history={props.history} login={login} error={error} />
        );
      }}
    </Mutation>
  );
};

export default LoginPageContainer;
