const mongoose = require("mongoose");

let connectionPromise;

function connectToDB() {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    }

    if (mongoose.connection.readyState === 2 && connectionPromise) {
        return connectionPromise;
    }

    if (!process.env.MONGO_URI) {
        return Promise.reject(new Error("MONGO_URI is not configured"));
    }

    connectionPromise = mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000
    })
        .then(() => {
            console.log("Connected to DB")
            return mongoose.connection;
        })
        .catch(err => {
            console.log("Error connecting to DB", err)
            connectionPromise = null;
            throw err;
        });

    return connectionPromise;
}

module.exports = connectToDB;
