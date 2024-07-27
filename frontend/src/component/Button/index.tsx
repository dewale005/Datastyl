import React from "react";
import {
  Button as MUIButton,
  IconButton as MUIIconButton,
} from "@mui/material";

// Define the type for the props of the Button component
type ButtonProps = React.ComponentPropsWithoutRef<typeof MUIButton>;

// Define the type for the ref of the Button component
type ButtonRef = React.ElementRef<typeof MUIButton>;

// Create a forward-ref Button component wrapping MUIButton
const Button = React.forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  return (
    <MUIButton
      variant="contained"
      sx={{ maxWidth: "200px" }}
      ref={ref}
      {...props}
    />
  );
});

// Set the display name for the Button component
Button.displayName = "Button";

// Define the type for the props of the IconButton component
type IconButtonProps = React.ComponentPropsWithoutRef<typeof MUIIconButton>;

// Define the type for the ref of the IconButton component
type IconButtonRef = React.ElementRef<typeof MUIIconButton>;

// Create a forward-ref IconButton component wrapping MUIIconButton
const IconButton = React.forwardRef<IconButtonRef, IconButtonProps>(
  (props, ref) => {
    return <MUIIconButton ref={ref} {...props} />;
  }
);

// Set the display name for the IconButton component
IconButton.displayName = "IconButton";

export { Button, IconButton };
