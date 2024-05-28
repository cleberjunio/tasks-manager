const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

dotenv.config();
const app = express();

connectToDatabase();

app.get("/", (req, res) => {
    res.status(200).send("Server all right boy....");
});

app.listen(8000, () => {
    console.log("Server is runinng...");
});
