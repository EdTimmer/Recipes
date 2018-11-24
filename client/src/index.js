import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./index.css";

import App from "./components/App.js";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup";

import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

// Required for 2.0

import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";

// Connect front-end to back-end (using Apollo 2.0)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: createHttpLink({ uri: "http://localhost:4444/graphql" }),

  fetchOptions: {
    credentials: "include"
  },

  request: operation => {
    const token = localStorage.getItem("token");

    operation.setContext({
      headers: {
        authorization: token
      }
    })

  },

  onError: ({ networkError }) => {
    if (networkError) {
      console.error("Network Error", networkError)
    }
  }
});



const Root = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);



// Wrap app with ApolloProvider (Apollo 1.0)

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root />
  </ApolloProvider>,
  document.getElementById("root")
);
