import axios from "../tool/api";
import { ILogin } from "./interface";
// Base URI for user-related endpoints
const BASE_URI = "/v1/auth/";

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
const loginUser = async (payload: ILogin) => {
  return handleApiResponse(axios.post(`${BASE_URI}/login`, payload));
};

export { loginUser };
