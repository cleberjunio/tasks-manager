const express = require("express");
const dotenv = require("dotenv");

const connectToDatabase = require("./src/database/mongoose.database");
const TaskModel = require("./src/models/task.model");

dotenv.config();
const app = express();
app.use(express.json());

connectToDatabase();

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await TaskModel.find({});
        res.status(200).send(tasks);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/tasks", async (req, res) => {
    const newTask = new TaskModel(req.body);
    await newTask.save();
    res.status(201).send(newTask);
    /*   try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (err) {
        res.status(500).send(err);
    } */
});

/* app.delete("/tasks/:id", async (req, res) => {
  

    const taskId = req.params.id;

    const deletedTask = await TaskModel.findByIdAndDelete(taskId);

    res.status(200).send(deletedTask);
}); */

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
