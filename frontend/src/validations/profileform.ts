import * as Yup from "yup";

// Define common validation rules for profile fields
const commonProfileValidation = Yup.string()
  .min(2, "Too Short!")
  .max(50, "Too Long!")
  .required("Required");

// Schema for creating a new profile
const ProfileSchema = Yup.object().shape({
  first_name: commonProfileValidation,
  last_name: commonProfileValidation,
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
});

// Schema for editing an existing profile (password is optional)
const EditProfileSchema = Yup.object().shape({
  first_name: commonProfileValidation,
  last_name: commonProfileValidation,
  email: Yup.string().email("Invalid email").required("Required"),
  phone_number: Yup.string().required("Required"),
  position: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  // Password field is not included as it's optional in this case
});

export { ProfileSchema, EditProfileSchema };
