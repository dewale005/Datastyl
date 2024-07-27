import React from "react";
import { IForm } from "./interface";
import { Box, Button, Input } from "../../component";
import useFormSanitizer from "../../hooks/useFormSanitizer";
import { IProfile } from "../../api/interface";
import SignInSchema from "../../validations/siginform";

const LoginForm: IForm = ({ handleSubmitData, initialValue }) => {
  // Use custom hook to handle form state and validation
  const sanitizer = useFormSanitizer<IProfile>({
    onSubmit: (value, { resetForm }) => handleSubmitData(value, resetForm),
    initialValues: initialValue,
    validationSchema: SignInSchema as any // Adjust type if needed
  });

  return (
    <Box role="presentation" className="login-container">
      <form onSubmit={sanitizer.handleSubmit}>
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
        <Button type="submit" disabled={!sanitizer.isValid}>
          Submit
        </Button>
      </form>
    </Box>
  );
};

export { LoginForm };
