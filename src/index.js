import React from "react";
import ReactDOM from "react-dom";

import { ApolloClient } from "apollo-boost";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloProvider } from "react-apollo";
import { setContext } from "apollo-link-context";
import { WebSocketLink } from "apollo-link-ws";

import { split } from "apollo-link";
import { getMainDefinition } from "apollo-utilities";

import { BrowserRouter, Route } from "react-router-dom";

import "./index.css";

import LoginPageContainer from "./pages/container/LoginPageContainer";
import HomePageContainer from "./pages/container/HomePageContainer";
import PrivateRoute from "./components/PrivateRoute";

const httpLink = createHttpLink({
  // uri: "http://172.16.126.52:4000/graphql"
  uri: "https://demo-server-chat-app.herokuapp.com/graphql"
});

const wsLink = new WebSocketLink({
  // uri: `ws://172.16.126.52:4000/graphql`,
  uri: "ws://demo-server-chat-app.herokuapp.com/graphql",
  options: {
    reconnect: true
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  const setHeader = { ...headers };
  if (token) setHeader.authorization = token;
  return {
    headers: {
      ...setHeader
    }
  };
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  authLink.concat(httpLink)
);

const cache = new InMemoryCache();
export const client = new ApolloClient({
  link,
  cache
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Route exact path="/" component={LoginPageContainer} />
      <PrivateRoute path="/home" component={HomePageContainer} />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
