import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/navBar";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login" component={Login} />
        <Route path="/users/:id?" component={Users} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
