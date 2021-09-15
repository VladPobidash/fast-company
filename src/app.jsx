import React, { useState } from "react";
import API from "./API";
import SearchStatus from "./components/searchStatus";
import Users from "./components/users";

const App = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

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
      <SearchStatus length={users.length} />
      <Users
        users={users}
        onDelete={handleDelete}
        onToggleBookMark={handleToggleBookMark}
      />
    </>
  );
};

export default App;
