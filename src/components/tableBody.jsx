import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import _ from "lodash";

const TableBody = ({ data, columns }) => {
  const renderContent = (item, col) => {
    if (columns[col].component) {
      const component = columns[col].component;
      if (typeof component === "function") {
        return component(item);
      } else {
        return component;
      }
    } else {
      if (columns[col].path === "name") {
        return (
          <Link to={`/users/${item._id}`}>
            {_.get(item, columns[col].path)}
          </Link>
        );
      } else {
        return _.get(item, columns[col].path);
      }
    }
  };
  return (
    <tbody>
      {data.map((item) => (
        <tr key={item._id}>
          {Object.keys(columns).map((col) => (
            <td key={col}>{renderContent(item, col)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

TableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.object.isRequired
};

export default TableBody;
