import React from "react";
import {
  Dialog as MUIDialog,
  DialogProps as MUIDialogProps,
  DialogTitle as MUIDialogTitle,
  DialogTitleProps as MUIDialogTitleProps,
} from "@mui/material";

// Define the props for the Modal component as the props for the MUIDialog component
type DialogProps = MUIDialogProps;

// Modal component wraps MUIDialog with forwarded ref
const Modal = React.forwardRef<React.ElementRef<typeof MUIDialog>, DialogProps>(
  (props, ref) => {
    // Forward the ref and spread the props to MUIDialog
    return <MUIDialog ref={ref} {...props} />;
  }
);

// Set the display name for the Modal component for easier debugging
Modal.displayName = "Modal";

// Define the props for the ModalTitle component as the props for the MUIDialogTitle component
type DialogTitleProps = MUIDialogTitleProps;

// ModalTitle component wraps MUIDialogTitle with forwarded ref
const ModalTitle = React.forwardRef<
  React.ElementRef<typeof MUIDialogTitle>,
  DialogTitleProps
>((props, ref) => {
  // Forward the ref and spread the props to MUIDialogTitle
  return <MUIDialogTitle ref={ref} {...props} />;
});

// Set the display name for the ModalTitle component for easier debugging
ModalTitle.displayName = "ModalTitle";

// Export the Modal and ModalTitle components for use in other parts of the application
export { Modal, ModalTitle };
