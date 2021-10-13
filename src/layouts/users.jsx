import React from "react";
import UserPage from "../components/userPage";
import UsersList from "../components/usersList";
import { useParams } from "react-router";

const Users = () => {
  const { id } = useParams();

  return id ? <UserPage id={id} /> : <UsersList />;
};

export default Users;
