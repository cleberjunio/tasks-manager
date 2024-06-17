const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");

const TaskRouter = require("./src/routes/task.routes");
dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();
app.use("/tasks", TaskRouter);

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});
