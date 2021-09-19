import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  valueProp,
  contentProp,
  selectedItem,
  onItemSelect
}) => {
  return (
    <ul className="list-group">
      {Object.keys(items).map((item) => (
        <li
          role="button"
          key={items[item][valueProp]}
          className={
            "list-group-item " + (items[item] === selectedItem ? "active" : "")
          }
          onClick={() => onItemSelect(items[item])}
        >
          {items[item][contentProp]}
        </li>
      ))}
    </ul>
  );
};

GroupList.defaultProps = {
  valueProp: "_id",
  contentProp: "name"
};
GroupList.propTypes = {
  items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  selectedItem: PropTypes.object,
  valueProp: PropTypes.string.isRequired,
  contentProp: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired
};

export default GroupList;
