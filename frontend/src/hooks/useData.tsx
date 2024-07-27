import { useCallback, useEffect, useMemo, useState } from "react";
import { IProfile } from "../api/interface";
import { createUser, fetchUsers, updateUser, deleteUser } from "../api/data";
import { toast } from "react-toastify";

/**
 * Custom hook to manage user data operations.
 */
const useUserData = () => {
  // State to store the list of users
  const [users, setUsers] = useState<IProfile[]>([]);

  /**
   * Fetches the list of users and updates the state.
   */
  const handleFetchUser = useCallback(async () => {
    const { code, data } = await fetchUsers();
    if (code === 200) {
      setUsers(data);
    } else {
      toast.error("Failed to fetch users");
    }
  }, []);

  /**
   * Creates a new user and updates the user list on success.
   * @param payload - User profile data to be created.
   * @param next - Callback function to be called after successful creation.
   */
  const handleCreateUser = useCallback(
    async (payload: IProfile, next: () => void) => {
      const { code, message } = await createUser(payload);
      if (code === 201) {
        toast.success("User created successfully");
        await handleFetchUser(); // Refresh the user list
        next(); // Execute the next callback if provided
      } else {
        toast.error(message);
      }
    },
    [handleFetchUser]
  );

  /**
   * Updates an existing user and refreshes the user list on success.
   * @param payload - User profile data to be updated.
   * @param next - Callback function to be called after successful update.
   */
  const handleUpdateUser = useCallback(
    async (payload: IProfile, next: () => void) => {
      const { code, message } = await updateUser(payload);
      if (code === 200) {
        toast.success("User profile updated successfully");
        await handleFetchUser(); // Refresh the user list
        next(); // Execute the next callback if provided
      } else {
        toast.error(message);
      }
    },
    [handleFetchUser]
  );

  /**
   * Deletes a user and refreshes the user list on success.
   * @param id - ID of the user to be deleted.
   */
  const handleDeleteUser = useCallback(
    async (id: number) => {
      const { code, message } = await deleteUser(id);
      if (code === 200) {
        toast.success("User deleted successfully");
        await handleFetchUser(); // Refresh the user list
      } else {
        toast.error(message);
      }
    },
    [handleFetchUser]
  );

  // Fetch the initial list of users when the component mounts
  useEffect(() => {
    void handleFetchUser();
  }, [handleFetchUser]);

  // Return memoized values to optimize performance
  return useMemo(
    () => ({
      users,
      handleCreateUser,
      handleUpdateUser,
      handleDeleteUser,
    }),
    [users, handleCreateUser, handleUpdateUser, handleDeleteUser] // Memoize values based on dependencies
  );
};

export default useUserData;
