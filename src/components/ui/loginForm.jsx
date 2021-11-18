import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";

const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value
    }));
  };

  const validateSchema = yup.object().shape({
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(
        /[A-Z]+/g,
        "Пароль должен содеражть хотя бы одну заглавную букву"
      )
      .matches(/\d+/g, "Пароль должен содержать хотя бы одно число")
      .matches(
        /(?=.*[!@#$%^&*])/,
        "Пароль должен содержать один из специальных символов !@#$%^&*"
      )
      .matches(/(?=.{8,})/, "Пароль должен состоянть минимум из 8 символов"),
    email: yup
      .string()
      .required("Email обязательный для заполнения")
      .email("Email введен некоректно")
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validateSchema
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();

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
      <CheckBoxField name="stayOn" value={data.stayOn} onChange={handleChange}>
        Оставаться в системе
      </CheckBoxField>
      <button disabled={!isValid} className="btn btn-primary w-100 mx-auto">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
