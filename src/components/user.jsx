import React, { useEffect, useState } from "react";
import API from "../api";

import Loading from "./loading";
import Qualite from "./qualite";
import PropTypes from "prop-types";
import { useHistory } from "react-router";

const User = ({ id }) => {
  const history = useHistory();
  const [user, setUser] = useState();

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    const user = await API.users.getById(id);
    setUser(user);
  }, []);

  if (!user) return <Loading />;

  const { name, qualities, profession, completedMeetings, rate } = user;

  return (
    <div className="card" style={{ width: "50%", margin: "0 auto" }}>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>
          {qualities.map((qualitie) => (
            <Qualite key={qualitie._id} {...qualitie} />
          ))}
        </p>
        <p>{profession.name}</p>
        <p>{completedMeetings}</p>
        <p>{rate}</p>
        <button
          className="btn btn-primary"
          onClick={() => history.replace("/users")}
        >
          Все пользователи
        </button>
      </div>
    </div>
  );
};
User.propTypes = {
  id: PropTypes.string.isRequired
};
export default User;
