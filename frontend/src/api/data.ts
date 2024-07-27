import axios from "../tool/api";
import { IProfile } from "./interface";

// Base URI for user-related endpoints
const BASE_URI = "/v1/user";

// Utility function to handle API responses
const handleApiResponse = async (promise: Promise<any>) => {
  try {
    const { data, status } = await promise;
    // Return successful response
    return {
      code: status,
      message: undefined,
      data,
    };
  } catch (error) {
    console.error(error);

    // Handle request cancellation specifically
    if (axios.isCancel(error)) {
      return {
        code: 400,
        message: "Request was canceled",
        data: undefined,
      };
    }

    // Handle Axios-specific errors
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status ?? 0;
      const errorMessage =
        error.response?.data.message || "Something went wrong";

      return {
        code: statusCode,
        message: errorMessage,
        data: undefined,
      };
    }

    // Handle any other unexpected errors
    return {
      code: 400,
      message: "An unexpected error occurred",
      data: undefined,
    };
  }
};

// Create a new user
const createUser = async (payload: IProfile) => {
  return handleApiResponse(axios.post(`${BASE_URI}`, payload));
};

// Fetch all users
const fetchUsers = async () => {
  return handleApiResponse(axios.get(`${BASE_URI}`));
};

// Update an existing user (excluding password)
const updateUser = async (payload: Omit<IProfile, "password">) => {
  const { id, ...rest } = payload;
  return handleApiResponse(axios.patch(`${BASE_URI}/${id}`, rest));
};

// Delete an existing user
const deleteUser = async (id: number) => {
  return handleApiResponse(axios.delete(`${BASE_URI}/${id}`));
};

export { createUser, fetchUsers, updateUser, deleteUser };
