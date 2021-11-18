import React from "react";

import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useParams } from "react-router";

const Users = () => {
  const { id } = useParams();

  return id ? <UserPage id={id} /> : <UsersListPage />;
};

export default Users;
