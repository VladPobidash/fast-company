/* eslint-disable indent */
export function validator(data, config) {
  const errors = {};

  function validate(validateMethod, data, config) {
    let statusValidate;
    const regExps = {
      email: /^\S+@\S+\.\S+$/g,
      capital: /[A-Z]+/g,
      digit: /\d+/g
    };

    switch (validateMethod) {
      case "isRequired": {
        if (typeof data === "boolean") {
          statusValidate = !data;
        } else {
          statusValidate = data.trim() === "";
        }
        break;
      }
      case "isEmail":
        statusValidate = !regExps.email.test(data);
        break;
      case "isCapitalSymbol":
        statusValidate = !regExps.capital.test(data);
        break;
      case "isContainDigit":
        statusValidate = !regExps.digit.test(data);
        break;
      case "min":
        statusValidate = data.length < config.value;
        break;
    }

    if (statusValidate) return config.message;
  }

  for (const fildName in data) {
    for (const validateMethod in config[fildName]) {
      const error = validate(
        validateMethod,
        data[fildName],
        config[fildName][validateMethod]
      );

      if (error && !errors[fildName]) {
        errors[fildName] = error;
      }
    }
  }

  return errors;
}
