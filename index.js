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
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.post("/tasks", async (req, res) => {
    try {
        const newTask = new TaskModel(req.body);
        await newTask.save();
        res.status(201).send(newTask);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;

        const taskDeleted = await TaskModel.findById(taskId);

        if (!taskDeleted) {
            return res.status(404).send("Essa tarefa não foi encontrada!!");
        }

        const deletedTask = await TaskModel.findByIdAndDelete(taskId);

        res.status(200).send(deletedTask);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.get("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const task = await TaskModel.findById(taskId);

        if (!task) {
            return res
                .status(404)
                .send("Não foi possível encontrar essa tarefa");
        }
        return res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

app.patch("/tasks/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const taskData = req.body;

        /* pega a tarefa */
        const taskToUpdate = await TaskModel.findById(taskId);

        /* mapeando os campos permitidos para atualizar tarefa */
        const allowedUpdates = ["isCompleted"];

        /* pegou os campos que o usuário está querendo atualizar */
        const requestUpdates = Object.keys(req.body);

        /* pra cada campo que está sendo recebido no body verificar se a lista de campos permitidos pra atualizar 
        inclui este campo.Se incluir(if) ,significa que este campo pode ser atualizado */
        for (update of requestUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = taskData[update];
            } else {
                return res
                    .status(400)
                    .send("Um ou mais campos inseridos não pode ser editados");
            }
        }
        await taskToUpdate.save();
        return res.status(200).send(taskToUpdate);
    } catch (error) {
        return res.status(500).send(error.message);
    }
});

app.listen(4000, () => {
    console.log("Listening on port 4000...");
});
