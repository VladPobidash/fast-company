/* eslint-disable multiline-ternary */
import React, { useState, useEffect } from "react";

import UsersTable from "./usersTable";
import Pagination from "./pagination";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import TextField from "./inputs/textField";
import Loading from "./loading";

import { paginate } from "../../utils/pagenate";
import API from "../../api";
import _ from "lodash";

const UsersList = () => {
  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [professions, setProfessions] = useState();
  const [selectedProf, setSelectedProf] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });

  const pageSize = 8;

  useEffect(() => {
    API.users.fetchAll().then(setUsers);
  }, []);

  useEffect(() => {
    API.professions.fetchAll().then(setProfessions);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedProf]);

  const handleDelete = (uesrId) => {
    setUsers(users.filter((u) => u._id !== uesrId));
  };

  const handleToggleBookMark = (id) => {
    const newUsers = [...users];
    const user = newUsers.find((u) => u._id === id);
    user.bookmark = !user.bookmark;

    setUsers([...newUsers]);
  };

  const handleSearchInput = ({ target }) => {
    clearFilter();
    setSearchQuery(target.value);
  };

  const handlePageChange = (pageIndex) => setCurrentPage(pageIndex);
  const handleProfessionSelect = (item) => {
    setSearchQuery("");
    setSelectedProf(item);
  };
  const clearFilter = () => setSelectedProf();
  const handleSort = (item) => setSortBy(item);

  if (users) {
    let filteredUsers = users;

    if (selectedProf) {
      filteredUsers = users.filter(
        (user) => user.profession._id === selectedProf._id
      );
    } else {
      filteredUsers = users.filter((user) => user.name.includes(searchQuery));
    }

    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, pageSize, currentPage);

    return (
      <div className="d-flex">
        {professions && (
          <div className="d-flex flex-column flex-shrink-0 p-2">
            <GroupList
              items={professions}
              selectedItem={selectedProf}
              onItemSelect={handleProfessionSelect}
            />
            <button className="btn btn-secondary mt-2" onClick={clearFilter}>
              Очистить
            </button>
          </div>
        )}
        <div className="d-flex flex-column w-100">
          <SearchStatus length={count} />
          <div className="m-2">
            <TextField
              type="search"
              name="search"
              value={searchQuery}
              placeholder="Search..."
              onChange={handleSearchInput}
            />
          </div>

          {count > 0 && (
            <UsersTable
              users={usersCrop}
              onSort={handleSort}
              selectedSort={sortBy}
              onDelete={handleDelete}
              onToggleBookMark={handleToggleBookMark}
            />
          )}

          <div className="d-flex justify-content-center">
            <Pagination
              itemsCount={count}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  return <Loading />;
};

export default UsersList;
