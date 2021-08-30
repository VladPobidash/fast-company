import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (num) => {
    if (length) {
      return (
        length +
        (num > 1 && num < 5 ? " человека тусанут" : " человек тусанет") +
        " с тобой сегодня"
      );
    } else {
      return "Никто с тобой не тусанет";
    }
  };

  return (
    <span className={`badge fs-3 m-2 bg-${length ? "primary" : "danger"}`}>
      {renderPhrase(length)}
    </span>
  );
};

export default SearchStatus;
