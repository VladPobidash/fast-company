import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const MultiSelectField = ({ label, name, defaultValue, options, onChange }) => {
  const optionsArray =
    !Array.isArray(options) && typeof options === "object"
      ? Object.keys(options).map((optionName) => ({
          label: options[optionName].name, // eslint-disable-line
          value: options[optionName]._id // eslint-disable-line
        })) // eslint-disable-line
      : options;

  const handleChange = (value) => {
    onChange({ name, value });
  };

  return (
    <div className="mb-4">
      <label className="form-label">{label}</label>

      <Select
        isMulti
        name={name}
        className="basic-multi-select"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        defaultValue={defaultValue}
        options={optionsArray}
        onChange={handleChange}
      />
    </div>
  );
};

MultiSelectField.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  defaultValue: PropTypes.array,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChange: PropTypes.func
};

export default MultiSelectField;
