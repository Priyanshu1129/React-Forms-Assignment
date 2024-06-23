import { useState } from 'react';

export const useForm = (initialValues, validate) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setValues({
        ...values,
        [name]: [...values[name], value],
      });
    } else {
      setValues({
        ...values,
        [name]: values[name].filter((item) => item !== value),
      });
    }
  };

  const handleDateChange = (name, value) => {
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      callback();
    }
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    handleCheckboxChange,
    handleDateChange,
    resetForm
  };
};