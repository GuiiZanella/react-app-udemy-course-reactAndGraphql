import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./index.css";
import App from "./components/App";
import Signin from "./components/Auth/Signin";
import Signup from "./components/Auth/Signup"
import withSession from "./components/withSession";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
  uri: "http://localhost:4444/graphql",
cache: new InMemoryCache(),
  },
  request: operation => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    })
  },
  onError: ({ networkError}) =>{
    if(networkError){
      console.log('Network Error', networkError);
      // if(networkError.statusCode === 401){
      //   localStorage.removeItem('token');
      // }
    }
  }
  // uri: "https://arty-users-api.herokuapp.com/graphql",
  // headers: 
  //   {"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imd6YW5lbGxhQG1haWxmZW5jZS5jb20iLCJzdWIiOiJhMmY2NjFkYi1jNDdiLTQ0NjEtYjhhNy04OTU2N2EwN2EyYzYiLCJpc3MiOiJVc2Vyc0FQSSIsImlhdCI6MTYwMTQzOTcyOCwiZXhwIjoxNjg3ODM5NzI4fQ.uegHOGrmx8LqzMSur2mTGF12SxbUDp-w1j6ZI8IP5sk"},
});

const Root = () =>(
  <Router>
    <Switch>
      <Route path="/" exact component={App} />
      <Route path="/signin" component={Signin} />
      <Route path="/signup" component={Signup} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <RootWithSession />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById("root")
);
