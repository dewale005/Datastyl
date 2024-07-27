import React from "react";
import { IForm } from "./interface";
import { Box, Button, Input } from "../../component";
import useFormSanitizer from "../../hooks/useFormSanitizer";
import {
  ProfileSchema,
  EditProfileSchema,
} from "../../validations/profileform";
import { IProfile } from "../../api/interface";

const ProfileForm: IForm = ({
  handleSubmitData,
  initialValue,
  type = "Create",
}) => {
  // Use custom hook to handle form state and validation
  const sanitizer = useFormSanitizer<IProfile>({
    onSubmit: (value, { resetForm }) => handleSubmitData(value, resetForm),
    initialValues: initialValue,
    validationSchema:
      type === "Create" ? ProfileSchema : (EditProfileSchema as any), // Adjust type if needed
  });

  return (
    <Box role="presentation" className="form-container">
      <form onSubmit={sanitizer.handleSubmit}>
        <h1>
          {type === "Create" ? "Create a new Profile" : "Update User Profile"}
        </h1>
        <Input
          placeholder="First Name"
          name="first_name"
          type="text"
          value={sanitizer.values.first_name}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={
            sanitizer.touched.first_name && Boolean(sanitizer.errors.first_name)
          }
          helperText={
            sanitizer.touched.first_name && sanitizer.errors.first_name
          }
        />
        <Input
          placeholder="Last Name"
          name="last_name"
          type="text"
          value={sanitizer.values.last_name}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={
            sanitizer.touched.last_name && Boolean(sanitizer.errors.last_name)
          }
          helperText={sanitizer.touched.last_name && sanitizer.errors.last_name}
        />
        <Input
          placeholder="email"
          name="email"
          type="email"
          value={sanitizer.values.email}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={sanitizer.touched.email && Boolean(sanitizer.errors.email)}
          helperText={sanitizer.touched.email && sanitizer.errors.email}
        />
        {type === "Create" && (
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={sanitizer.values.password}
            onChange={sanitizer.handleChange}
            onBlur={sanitizer.handleBlur}
            error={
              sanitizer.touched.password && Boolean(sanitizer.errors.password)
            }
            helperText={sanitizer.touched.password && sanitizer.errors.password}
          />
        )}
        <Input
          placeholder="Phone Number"
          name="phone_number"
          type="text"
          value={sanitizer.values.phone_number}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={
            sanitizer.touched.phone_number &&
            Boolean(sanitizer.errors.phone_number)
          }
          helperText={
            sanitizer.touched.phone_number && sanitizer.errors.phone_number
          }
        />
        <Input
          placeholder="Position"
          name="position"
          type="text"
          value={sanitizer.values.position}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={
            sanitizer.touched.position && Boolean(sanitizer.errors.position)
          }
          helperText={sanitizer.touched.position && sanitizer.errors.position}
        />
        <Input
          placeholder="City"
          name="city"
          type="text"
          value={sanitizer.values.city}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={sanitizer.touched.city && Boolean(sanitizer.errors.city)}
          helperText={sanitizer.touched.city && sanitizer.errors.city}
        />
        <Input
          placeholder="Country"
          name="country"
          type="text"
          value={sanitizer.values.country}
          onChange={sanitizer.handleChange}
          onBlur={sanitizer.handleBlur}
          error={sanitizer.touched.country && Boolean(sanitizer.errors.country)}
          helperText={sanitizer.touched.country && sanitizer.errors.country}
        />
        <Button type="submit" disabled={!sanitizer.isValid}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export { ProfileForm };
