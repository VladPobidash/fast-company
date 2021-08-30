import React from "react";

const Qualite = ({ color, name, _id }) => {
  return (
    <span key={_id} className={`badge bg-${color} m-1`}>
      {name}
    </span>
  );
};

export default Qualite;
