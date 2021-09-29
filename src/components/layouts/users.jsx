import React from "react";
import User from "../user";
import UsersList from "../usersList";
import { useParams } from "react-router";

const Users = () => {
  const { id } = useParams();

  return id ? <User id={id} /> : <UsersList />;
};

export default Users;
