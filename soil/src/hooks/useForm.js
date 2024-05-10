// Code/concept was taken from Rmit/Canvas/2412/wk4/Practicle

import { useEffect, useState } from "react";

/**
 * Custom Generic hook to handle all forms -
 * callback = whats gonna happen when form is submitted
 * validate = validate function
 * formType = which form we submitting for validation
 */
const useForm = (callback, validate, formType, requireOneField = false) => {
  // Current form values
  const [values, setValues] = useState({});
  // Errors form may have
  const [errors, setErrors] = useState({});
  // Are we submitting currently?
  const [isSubmitting, setIsSubmitting] = useState(false);

  /**
   * Used to figure out wheather or not we are gonna call the callback function
   * useEffects is called everytime our errors is updated
   * */
  useEffect(() => {
    // Check if there are any errors and are we currently submitting?
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
      setTimeout(() => {
        setValues({});
      }, 3000);
      // Reset form fields after successful submission - PRofile
      if (requireOneField) {
        setValues({});
      }
    }
  }, [errors]);

  // Handles form submition
  const handleSubmit = (event) => {
    // event.preventDefault prevents it from self submiting and stops the default browser behaviour
    if (event) event.preventDefault();
    setErrors(validate(values, formType));
    setIsSubmitting(true);
  };

  // Updates current values
  const handleChange = (event) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  // return so we can use these functions in any other component
  return {
    handleSubmit,
    handleChange,
    values,
    errors,
  };
};

export default useForm;
