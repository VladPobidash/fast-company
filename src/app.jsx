import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import EditUserForm from "./components/ui/editUserForm";

const App = () => {
  return (
    <>
      <NavBar />

      <Switch>
        <Route exact path="/" component={Main} />
        <Route path="/login/:type?" component={Login} />
        <Route path="/users/:id/edit" component={EditUserForm} />
        <Route path="/users/:id?" component={Users} />
      </Switch>
    </>
  );
};

export default App;
