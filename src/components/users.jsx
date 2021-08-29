import React, { useState } from "react";
import API from "../API";

const Users = () => {
  const [users, setUsers] = useState(API.users.fetchAll());

  const handleDelete = (uId) => {
    setUsers(users.filter((u) => u._id !== uId));
  };
  const renderPhrase = (num) => {
    if (users.length) {
      return (
        users.length +
        (num > 1 && num < 5 ? " человека тусанут" : " человек тусанет") +
        " с тобой сегодня"
      );
    } else {
      return "Никто с тобой не тусанет";
    }
  };

  return (
    <>
      <span className={`badge fs-3 bg-${users.length ? "primary" : "danger"}`}>
        {renderPhrase(users.length)}
      </span>
      {users.length ? (
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Имя</th>
              <th scope="col">Качества</th>
              <th scope="col">Профессия</th>
              <th scope="col">Встретился, раз</th>
              <th scope="col">Оценка</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>
                  {u.qualities.map((c) => (
                    <span key={c._id} className={`badge bg-${c.color} mr-3`}>
                      {c.name}
                    </span>
                  ))}
                </td>
                <td>{u.profession.name}</td>
                <td>{u.completedMeetings}</td>
                <td>{u.rate}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(u._id)}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        ""
      )}
    </>
  );
};

export default Users;
