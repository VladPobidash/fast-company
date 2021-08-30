import React from "react";
import BookMark from "./bookMark";
import Qualite from "./qualite";

const User = ({
  _id,
  name,
  profession,
  qualities,
  completedMeetings,
  rate,
  status,
  onToggleBookMark,
  onDelete,
}) => {
  return (
    <tr key={_id}>
      <td>{name}</td>
      <td>
        {qualities.map((qualitie) => (
          <Qualite key={qualitie._id} qualitie={qualitie} />
        ))}
      </td>
      <td>{profession.name}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
      <td>
        <BookMark
          status={status}
          onToggleBookMark={() => onToggleBookMark(_id)}
        />
      </td>
      <td>
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      </td>
    </tr>
  );
};

export default User;
