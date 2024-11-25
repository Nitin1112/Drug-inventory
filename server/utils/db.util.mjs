import mongoose from "mongoose";
import { server_config } from "../server.config.js";

export const create_db_connection = async () => {
    try {
        console.log("Connecting to mongodb server");
        await mongoose.connect(server_config.mongodb_connection_string);
        console.log("Connected to mongodb server");
    } catch (e) {
        console.log("Error connecting to MongoDB server: " + e.message);
        process.exit(1);
    }

    // Handle disconnections or errors
    mongoose.connection.on("disconnected", () => {
        console.warn("MongoDB disconnected");
    });

    mongoose.connection.on("error", (err) => {
        console.error("MongoDB error: " + err.message);
    });
}