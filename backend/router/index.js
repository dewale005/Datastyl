const express = require("express");

// Import route modules for handling authentication and user-related routes
const userRouter = require('./user.router'); // Router for user-related operations
const authRouter = require('./auth.router'); // Router for authentication operations

// Create a new Express Router instance
const router = express.Router();

// Define an array of routes and their corresponding router modules
const defaultRoutes = [
    {
        path: "/auth",    // Path for authentication-related routes
        route: authRouter // Router module handling authentication
    },
    {
        path: "/user",    // Path for user-related routes
        route: userRouter // Router module handling user operations
    }
];

// Register each route and its associated router module with the main router
defaultRoutes.forEach(({ path, route }) => {
    router.use(path, route); // Mount the router module at the specified path
});

// Export the configured router instance
module.exports = router;
