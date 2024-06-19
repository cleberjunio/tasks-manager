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
}
module.exports = TaskController;
