import React from "react";
import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";

// Define the props for the Input component as the props for the MUITextField component
type InputProps = MUITextFieldProps;

// Use React.forwardRef to forward the ref to the MUITextField component
const Input = React.forwardRef<
  React.ElementRef<typeof MUITextField>,
  InputProps
>((props, ref) => {
  // Spread the props and forward the ref to the MUITextField component
  return <MUITextField variant="outlined" size="small" ref={ref} {...props} />;
});

// Set the display name for the Input component
Input.displayName = "Input";

export { Input };
