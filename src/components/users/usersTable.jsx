import React from "react";
import Table from "../table/table";
import BookMark from "./bookMark";
import PropTypes from "prop-types";
import QualitiesList from "./qualitiesList";
import { Link } from "react-router-dom";

const UserTable = ({
  users,
  onSort,
  selectedSort,
  onToggleBookMark,
  onDelete,
  ...rest
}) => {
  const columns = {
    name: {
      path: "name",
      name: "Имя",
      component: (user) => <Link to={`/users/${user._id}`}>{user.name}</Link>
    },
    qualities: {
      name: "Качества",
      component: ({ qualities }) => <QualitiesList qualities={qualities} />
    },
    profession: { path: "profession.name", name: "Профессия" },
    completedMeetings: { path: "completedMeetings", name: "Встретился, раз" },
    rate: { path: "rate", name: "Оценка" },
    bookmark: {
      path: "bookmark",
      name: "Избранное",
      component: ({ bookmark, _id }) => (
        <BookMark
          status={bookmark}
          onToggleBookMark={() => onToggleBookMark(_id)}
        />
      )
    },
    delete: {
      component: ({ _id }) => (
        <button className="btn btn-danger" onClick={() => onDelete(_id)}>
          delete
        </button>
      )
    }
  };
  return (
    <Table
      data={users}
      columns={columns}
      selectedSort={selectedSort}
      onSort={onSort}
    />
  );
};

UserTable.propTypes = {
  users: PropTypes.array.isRequired,
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  onToggleBookMark: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default UserTable;
