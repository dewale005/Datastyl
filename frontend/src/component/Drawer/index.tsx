import React from 'react';
import { Drawer as MUIDrawer, DrawerProps as MUIDrawerProps } from '@mui/material';

// Define the type for the Drawer component's props based on MUI's DrawerProps
type DrawerProps = MUIDrawerProps;

// Create a Drawer component using React.forwardRef to forward the ref to the MUIDrawer component
const Drawer = React.forwardRef<
  React.ElementRef<typeof MUIDrawer>, // Type for the forwarded ref
  DrawerProps // Type for the component's props
>((props, ref) => {
  // Render the MUIDrawer component with the forwarded ref and spread props
  return <MUIDrawer anchor="right" ref={ref} {...props} />;
});

// Set a display name for the Drawer component to improve debugging and component identification
Drawer.displayName = 'Drawer';

export { Drawer };
