import React, { useState, useEffect } from "react";
import API from "./api";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);

  const handleDelete = (uesrId) => {
    setUsers(users.filter((u) => u._id !== uesrId));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const user = newUsers.find((u) => u._id === id);
    user.status = !user.status;

    setUsers([...newUsers]);
  };

  return (
    <>
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
};

export default App;
