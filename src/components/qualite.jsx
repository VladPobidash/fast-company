import React from "react";

const Qualite = ({ color, name }) => {
  return <span className={`badge bg-${color} m-1`}>{name}</span>;
};

export default Qualite;
