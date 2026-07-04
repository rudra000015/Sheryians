const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

app.use((err, req, res, next) => {
    console.error(err);

    const isDatabaseUnavailable =
        err.name?.includes("Mongoose") ||
        err.message?.includes("before initial connection") ||
        err.message?.includes("buffering timed out");

    res.status(isDatabaseUnavailable ? 503 : 500).json({
        message: isDatabaseUnavailable
            ? "Database is unavailable. Check the MongoDB connection."
            : "Internal server error",
    });
})

module.exports = app
