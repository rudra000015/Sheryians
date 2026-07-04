const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectToDB = require("./config/database");


const app = express();
app.use(express.json());
app.use(cookieParser());

const allowedOrigins = (process.env.CLIENT_URL || "http://localhost:5173")
    .split(",")
    .map(origin => origin.trim().replace(/\/$/, ""))
    .filter(Boolean);

console.log("Allowed client origins:", allowedOrigins.join(", "));

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
}))

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Moodify API is running"
    })
})

app.use("/api", async (req, res, next) => {
    try {
        await connectToDB();
        next();
    } catch (err) {
        res.status(503).json({
            message: "Database connection failed"
        });
    }
})

/**
 * Routes
 */
const authRoutes = require("./routes/auth.routes")
const songRoutes = require("./routes/song.routes")

app.use("/api/auth", authRoutes)
app.use("/api/songs", songRoutes)

app.use((err, req, res, next) => {
    console.log(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        message: "Internal server error"
    });
})

module.exports = app
