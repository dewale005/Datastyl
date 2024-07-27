import { useCallback, useEffect, useMemo, useState } from "react";
import { ILogin } from "../api/interface";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";

/**
 * Custom hook for handling user authentication.
 * Manages user login, logout, and authentication state.
 * @returns {Object} An object containing the handleLoginUser function, logOut function, and authentication state.
 */
const useAuthenticate = () => {
  // State to keep track of authentication status
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  /**
   * Handles user login by calling the loginUser API function.
   * Provides feedback to the user through toast notifications.
   *
   * @param {ILogin} payload - The user login data.
   * @param {Function} next - Optional callback function to be called on successful login.
   * @returns {Promise<void>} A promise that resolves when the login process is complete.
   */
  const handleLoginUser = useCallback(
    async (payload: ILogin, next?: () => void) => {
      try {
        // Perform the login operation
        const { code, data, message } = await loginUser(payload);

        if (code === 200) {
          // Successful login; store token and update authentication state
          localStorage.setItem("token", data["accessToken"]);
          setAuthenticated(true);
          if (next) next(); // Call the next callback if provided
        } else {
          // Login failed; display an error message
          toast.error(message || "An unexpected error occurred.");
        }
      } catch (error) {
        // Handle any unexpected errors during the login process
        toast.error("An error occurred while attempting to log in.");
      }
    },
    [] // Dependencies for useCallback; none in this case
  );

  /**
   * Fetches the token from localStorage and updates authentication state.
   * Called on component mount to check if the user is already authenticated.
   */
  const fetchToken = useCallback(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  /**
   * Logs out the user by removing the token from localStorage and updating authentication state.
   */
  const logOut = useCallback(() => {
    localStorage.removeItem("token");
    setAuthenticated(false);
  }, []);

  // Fetch token on component mount
  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  // Memoize the return value to avoid unnecessary re-renders
  return useMemo(
    () => ({
      handleLoginUser,
      logOut,
      authenticated,
    }),
    [handleLoginUser, logOut, authenticated] // Dependencies for useMemo
  );
};

export default useAuthenticate;
