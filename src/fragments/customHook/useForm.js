import { useState } from 'react';

// Custom hook for managing form state and validation
export const useForm = (initialValues, validate) => {
  // State to store form values
  const [values, setValues] = useState(initialValues);
  // State to store form validation errors
  const [errors, setErrors] = useState({});

  // Function to handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value from event.target
    setValues({
      ...values,
      [name]: value, // Update form values state
    });
  };

  // Function to validate the form
  const validateForm = () => {
    const validationErrors = {};
    // Iterate over each field in the form values
    Object.keys(values).forEach((name) => {
      const error = validate(name, values[name], values); // Validate each field
      if (error) {
        validationErrors[name] = error; // If there's an error, add it to validationErrors
      }
    });
    setErrors(validationErrors); // Set the errors state
    return Object.keys(validationErrors).length === 0; // Return true if no validation errors, otherwise false
  };

  // Function to reset the form to its initial state
  const resetForm = () => {
    setValues(initialValues); // Reset form values to initial values
    setErrors({}); // Clear validation errors
  };

  
  return {
    values, 
    errors, 
    handleChange, 
    setErrors, 
    validateForm, 
    resetForm,
  };
};
