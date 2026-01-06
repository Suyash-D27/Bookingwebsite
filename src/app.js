// app.js
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

// Config & DB
const connectDB = require("./config/db");

// Middlewares
const { errorHandler } = require("./middlewares/errorMiddleware");

// Routes (using routes/index.js)
const routes = require("./routes");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// 🔹 Middlewares
app.use(express.json()); // parse JSON requests
app.use(express.urlencoded({ extended: true })); // parse form data
app.use(cors()); // enable CORS for frontend
app.use(morgan("dev")); // log HTTP requests

// 🔹 Mount all routes
app.use("/api", routes);

// 🔹 Global error handler
app.use(errorHandler);

module.exports = app;

