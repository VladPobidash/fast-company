import React from "react";
import UserPage from "../components/users/userPage";
import UsersList from "../components/users/usersList";
import { useParams } from "react-router";

const Users = () => {
  const { id } = useParams();

  return id ? <UserPage id={id} /> : <UsersList />;
};

export default Users;
