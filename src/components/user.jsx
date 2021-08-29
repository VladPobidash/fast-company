import React from "react";

const User = ({ name, profession, qualities, completedMeetings, rate }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{profession}</td>
      <td>{qualities}</td>
      <td>{completedMeetings}</td>
      <td>{rate}</td>
    </tr>
  );
};

export default User;
