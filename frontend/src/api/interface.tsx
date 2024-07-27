// Define the shape of the profile data
// This type represents a user's profile with all necessary details
type IProfile = {
  id?: number; // Optional unique identifier for the user profile
  first_name: string; // User's first name
  last_name: string; // User's last name
  email: string; // User's email address
  password: string; // User's password (typically used for authentication)
  phone_number: string; // User's phone number
  position: string; // User's job position or title
  city: string; // User's city of residence
  country: string; // User's country of residence
};

// Define the shape of login form values
// This type is a subset of IProfile and includes only the properties needed for login
type ILogin = Pick<IProfile, "email" | "password">;

// Define possible form types
// This type represents different modes of a form (e.g., for editing or creating a profile)
type IFormType = "Edit" | "Create";

// Export the types for use in other parts of the application
export type { IProfile, ILogin, IFormType };
