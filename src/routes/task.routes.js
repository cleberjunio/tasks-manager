const express = require("express");
const router = express.Router();

const TaskModel = require("../models/task.model");
const TaskController = require("../controllers/task.controller");

router.get("/", async (req, res) => {
    return new TaskController(req, res).getTasksAll();
});

router.post("/", async (req, res) => {
    return new TaskController(req, res).createTasks();
});

router.delete("/:id", async (req, res) => {
    return new TaskController(req, res).deleteTasks();
});

router.get("/:id", async (req, res) => {
    return new TaskController(req, res).getTaskId();
});

router.patch("/:id", async (req, res) => {
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

module.exports = router;
