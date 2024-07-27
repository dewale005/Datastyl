import * as Yup from 'yup';

// Define common validation rules for string fields
const stringRequired = Yup.string().required("Required");

// Schema for Sign In form validation
const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format") // Validate that the email is in a proper format
    .required("Email is required"), // Ensure email field is not empty

  password: stringRequired, // Apply common validation rule for password
});

export default SignInSchema;
