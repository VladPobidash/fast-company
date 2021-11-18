import React from "react";
import PropTypes from "prop-types";
import SortIcon from "../sortIcon";

const TableHeader = ({ onSort, selectedSort, columns }) => {
  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === "asc" ? "desc" : "asc"
      });
    } else {
      onSort({ path: item, order: "asc" });
    }
  };
  return (
    <thead>
      <tr>
        {Object.keys(columns).map((col) => (
          <th
            key={col}
            onClick={
              columns[col].path
                ? () => handleSort(columns[col].path)
                : undefined
            }
            {...{ role: columns[col].path && "button" }}
            scope="col"
          >
            {columns[col].name}
            {columns[col].path === selectedSort.path && (
              <SortIcon order={selectedSort.order} />
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

TableHeader.propTypes = {
  onSort: PropTypes.func.isRequired,
  selectedSort: PropTypes.object.isRequired,
  columns: PropTypes.object.isRequired
};
export default TableHeader;
