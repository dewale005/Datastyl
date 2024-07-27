import { useMemo } from 'react';
import { FormikConfig, FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';

// Define a generic type for form values. 
// This type is used to represent the shape of form values in a generic manner.
type FormValues = {
  [key: string]: any;
};

// Define the custom hook for form sanitization
const useFormSanitizer = <T extends FormValues>({
  initialValues, // Initial values for the form fields
  onSubmit, // Callback function to handle form submission
  validationSchema, // Optional validation schema for the form
}: {
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void;
  initialValues: T; 
  validationSchema?: Yup.ObjectSchema<T>; // Mark validationSchema as optional
}) => {
  // Configure Formik with the provided configuration options
  const formikConfig: FormikConfig<T> = {
    initialValues, // Set the initial values for the form
    onSubmit, // Set the form submission handler
    validationSchema, // Set the validation schema if provided
  };

  // Use Formik hook to manage form state and handle form logic
  const formik = useFormik(formikConfig);

  // Memoize the formik object to optimize performance
  // This ensures that the formik object is only recreated when necessary
  return useMemo(
    () => ({
      ...formik, // Spread all properties from the formik object
    }),
    [formik] // Dependencies array: formik object is the dependency
  );
};

export default useFormSanitizer;
