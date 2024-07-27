import React from "react";
import { Stack as MUIStack, StackProps as MUIStackProps } from "@mui/material";

// Define the props for the custom Stack component, extending the props of the MUIStack component
type StackProps = MUIStackProps;

// Create a custom Stack component using React.forwardRef to forward the ref to the MUIStack component
const Stack = React.forwardRef<React.ElementRef<typeof MUIStack>, StackProps>(
  (props, ref) => {
    // Spread the received props and forward the ref to the MUIStack component
    return <MUIStack ref={ref} {...props} />;
  }
);

// Set the display name for the custom Stack component for better debugging and React DevTools
Stack.displayName = "Stack";

export { Stack };
