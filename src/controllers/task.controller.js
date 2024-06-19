const TaskModel = require("../models/task.model");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getTasksAll() {
        try {
            const tasks = await TaskModel.find({});
            this.res.status(200).send(tasks);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async createTasks() {
        try {
            const newTask = new TaskModel(this.req.body);
            await newTask.save();
            this.res.status(201).send(newTask);
        } catch (err) {
            this.res.status(500).send(err);
        }
    }

    async deleteTasks() {
        try {
            const taskId = this.req.params.id;
            const taskDeleted = await TaskModel.findById(taskId);

            if (!taskDeleted) {
                return this.res
                    .status(404)
                    .send("Não é permitido  deletetar essa tarefa");
            }
            const deleteToTask = await TaskModel.findByIdAndDelete(taskId);
            return this.res.status(200).send(deleteToTask);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async getTaskId() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return this.res
                    .status(404)
                    .send("Essa tarefa não foi encontrada!");
            }
            return this.res.status(200).send(task);
        } catch (error) {
            this.res.status(500).send(error.message);
        }
    }

    async updateTasks() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            /* pega a tarefa */
            const taskToUpdate = await TaskModel.findById(taskId);

            /* mapeando os campos permitidos para atualizar tarefa */
            const allowedUpdates = ["isCompleted"];

            /* pegou os campos que o usuário está querendo atualizar */
            const requestUpdates = Object.keys(taskData);

            /* pra cada campo que está sendo recebido no body verificar se a lista de campos permitidos pra atualizar 
          inclui este campo.Se incluir(if) ,significa que este campo pode ser atualizado */

            for (const update of requestUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = taskData[update];
                } else {
                    return this.res
                        .status(400)
                        .send(
                            "Um ou mais campos inseridos não pode ser editados"
                        );
                }
            }
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            return this.res.status(500).send(error.message);
        }
    }
}
module.exports = TaskController;
