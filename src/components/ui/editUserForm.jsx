/* eslint-disable multiline-ternary */

import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import API from "../../api";
import { validator } from "../../utils/validator";

import Loading from "../common/loading";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";

const EditUserForm = () => {
  const history = useHistory();
  const { id } = useParams();

  const [data, setData] = useState({
    name: "",
    email: "",
    profession: "",
    sex: "male",
    qualities: []
  });
  const [loading, setLoading] = useState(true);
  const [qualities, setQualities] = useState({});
  const [professions, setProfessions] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    API.users
      .getById(id)
      .then((user) => {
        setData({
          name: user.name,
          email: user.email,
          profession: user.profession._id,
          sex: user.sex,
          qualities: user.qualities.map((quality) => ({
            label: quality.name,
            value: quality._id
          }))
        });
      })
      .finally(() => setLoading(false));
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

    if (!isValid) return;

    const updatedUser = {
      ...data,
      profession:
        professions[
          Object.keys(professions).find(
            (key) => professions[key]._id === data.profession
          )
        ],
      qualities: data.qualities.map(
        (quality) =>
          qualities[
            Object.keys(qualities).find(
              (key) => qualities[key]._id === quality.value
            )
          ]
      )
    };

    API.users.update(id, updatedUser).then(() => history.push(`/users/${id}`));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          {loading ? (
            <Loading />
          ) : (
            <form onSubmit={handleSubmit}>
              <TextField
                label="Имя"
                type="name"
                name="name"
                value={data.name}
                error={errors.name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                value={data.email}
                error={errors.email}
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
                defaultValue={data.qualities}
                options={qualities}
                onChange={handleChange}
              />
              <button disabled={!isValid} className="btn btn-primary w-100">
                Обновить
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditUserForm;
