import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../utils/validator";
import API from "../../api";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const RegisterForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.professions.fetchAll().then(setProfessions);
    API.qualities.fetchAll().then(setQualities);
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validatorConfig = {
    email: {
      isRequired: {
        message: "Email обязательный для заполнения"
      },
      isEmail: {
        message: "Email введен некоректно"
      }
    },
    password: {
      isRequired: {
        message: "Пароль обязательный для заполнения"
      },
      isCapitalSymbol: {
        message: "Пароль должен содеражть хотя бы одну заглавную букву"
      },
      isContainDigit: {
        message: "Пароль должен содержать хотя бы одно число"
      },
      min: {
        message: "Пароль должен состоянть минимум из 8 символов",
        value: 8
      }
    },
    profession: {
      isRequired: {
        message: "Обязательно выберите вашу профессию"
      }
    }
  };

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

    console.log(isValid);

    if (!isValid) return;
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        name="email"
        value={data.email}
        error={errors.email}
        onChange={handleChange}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        error={errors.password}
        onChange={handleChange}
      />
      <SelectField
        label="Выбери свою профессию"
        name="profession"
        defaultOption="Choose..."
        options={professions}
        value={data.profession}
        error={errors.profession}
        onChange={handleChange}
      />
      <RadioField
        label="Выбери свой пол"
        name="sex"
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" }
        ]}
        value={data.sex}
        onChange={handleChange}
      />
      <MultiSelectField
        label="Выбери свои качества"
        name="qualities"
        options={qualities}
        onChange={handleChange}
      />
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
