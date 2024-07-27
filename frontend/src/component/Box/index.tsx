import React from "react";
import { Box as MUIBox, BoxProps as MUIBoxProps } from "@mui/material";

// Define the props for the Box component, which are the same as the props for the MUIBox component
type BoxProps = MUIBoxProps;

// Create a Box component using React.forwardRef to forward the ref to the MUIBox component
const Box = React.forwardRef<React.ElementRef<typeof MUIBox>, BoxProps>(
  (props, ref) => {
    // Spread the props and forward the ref to the MUIBox component
    return <MUIBox ref={ref} {...props} />;
  }
);

// Set the display name for the Box component for better debugging and display in React DevTools
Box.displayName = "Box";

export { Box };
