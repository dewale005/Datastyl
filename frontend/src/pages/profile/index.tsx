import React, { useState } from "react";
import { Drawer } from "../../component/Drawer";
import { IFormType, IProfile } from "../../api/interface";
import { LoginForm } from "../../element/Forms/LoginForm";
import useAuthenticate from "../../hooks/useAuth";
import { Button, GridTable, Modal, ModalTitle } from "../../component";
import useUserData from "../../hooks/useData";
import { ProfileForm } from "../../element/Forms/ProfileForm";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";

// Define the initial values for the profile form
const initialValues: IProfile = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  phone_number: "",
  position: "",
  city: "",
  country: "",
};

// Define columns configuration for the GridTable component
const columns: Column<IProfile>[] = [
  { id: "first_name", label: "First Name" },
  { id: "last_name", label: "Last Name" },
  { id: "email", label: "Email" },
  { id: "phone_number", label: "Phone Number" },
  { id: "position", label: "Position" },
  { id: "city", label: "City" },
  { id: "country", label: "Country" },
];

// Type for column configuration
interface Column<T> {
  id: keyof T; // Key to access the data in the row
  label: string; // Header label
}

function ProfilePage() {
  // State hooks to manage the drawer, modal, form type, and initial user values
  const [open, setOpen] = useState<boolean>(false);
  const [openModal, setModalOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<IFormType>("Create");
  const { handleLoginUser, authenticated, logOut } = useAuthenticate();
  const { users, handleCreateUser, handleUpdateUser, handleDeleteUser } =
    useUserData();
  const [initialUserValue, setInitialUserValue] =
    useState<IProfile>(initialValues);

  // Function to handle opening the drawer with the specified form type and user data
  const handleDrawer = (
    value: IProfile = initialValues,
    type: IFormType = "Create"
  ) => {
    setInitialUserValue(value);
    setFormType(type);
    setOpen(true);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
              SOCOTEC Datatys
            </Typography>
            {/* Render login or logout button based on authentication status */}
            {!authenticated ? (
              <Button
                onClick={() => setModalOpen(true)}
                variant="text"
                color="inherit"
              >
                Login
              </Button>
            ) : (
              <Button onClick={logOut} variant="text" color="inherit">
                Log Out
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>

      <div className="root">
        {/* Button to open the drawer for adding a new user */}
        <Button onClick={() => handleDrawer()}>Add New User</Button>

        {/* GridTable component to display user data and handle row clicks */}
        <GridTable
          columns={columns}
          data={users}
          handleDelete={handleDeleteUser}
          onClickRow={(value) => handleDrawer(value, "Edit")}
        />

        {/* Drawer component containing the profile form */}
        <Drawer open={open} onClose={() => setOpen(false)}>
          <ProfileForm
            initialValue={initialUserValue}
            type={formType}
            handleSubmitData={(value, next) =>
              formType === "Create"
                ? handleCreateUser(value, () => {
                    next();
                    setOpen(false);
                  })
                : handleUpdateUser(value, () => {
                    next();
                    setOpen(false);
                  })
            }
          />
        </Drawer>
      </div>

      {/* Modal component for login */}
      <Modal open={openModal} onClose={() => setModalOpen(false)}>
        <ModalTitle>Sign in for More Permissions</ModalTitle>
        <LoginForm
          initialValue={{ email: "", password: "" }}
          handleSubmitData={(value: IProfile, next: any) =>
            handleLoginUser(value, () => {
              next();
              setModalOpen(false);
            })
          }
        />
      </Modal>

      {/* ToastContainer for displaying notifications */}
    </div>
  );
}

export default ProfilePage;
