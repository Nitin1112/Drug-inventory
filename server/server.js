import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { server_config } from "./server.config.js";
import { create_db_connection } from "./utils/db.util.mjs";

import inventoryRouter from "./routes/inventory.route.mjs";
import userRouter from "./routes/user.route.mjs"; // User registration routes
import adminRouter from "./routes/admin.route.mjs"; // Super admin routes

import { requestLoggerMiddleware } from "./middlewares/log.middleware.mjs";
import medicinesRouter from "./routes/medicines.route.mjs";

const start_server = async () => {
    // Express server initialization
    const app = express();

    // Middleware
    app.use(bodyParser.json()); // Parse JSON request bodies
    app.use(bodyParser.urlencoded({ extended: true }));

    // Cros setup
    app.use(cors());

    // DB connection
    await create_db_connection();

    // Middlewares
    app.use(requestLoggerMiddleware);

    // Routes
    app.use("/api/inventory", inventoryRouter); // Inventory-related routes
    app.use("/api/user", userRouter); // User-related routes
    app.use("/api/admin", adminRouter); // Super admin-related routes
    app.use("/api/medicines", medicinesRouter); // medicines related routes

    // Express server startup
    app.listen(server_config.port, () => {
        console.log(`Server started on http://localhost:${server_config.port}`);
    });
};

start_server();
