const TaskModel = require("../models/task.model");
const {
    notFoundError,
    objectIdCastError,
} = require("../errors/mongodb.errors");
const { notAllowedFieldsToUpdateError } = require("../errors/general.errors");
const { default: mongoose } = require("mongoose");
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
                return notFoundError(this.res);
            }
            const deleteToTask = await TaskModel.findByIdAndDelete(taskId);
            return this.res.status(200).send(deleteToTask);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async getTaskId() {
        try {
            const taskId = this.req.params.id;
            const task = await TaskModel.findById(taskId);

            if (!task) {
                return notFoundError(this.res);
            }
            return this.res.status(200).send(task);
        } catch (error) {
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(error.message);
        }
    }

    async updateTasks() {
        try {
            const taskId = this.req.params.id;
            const taskData = this.req.body;

            /* pega a tarefa */
            const taskToUpdate = await TaskModel.findById(taskId);

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

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
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }
            await taskToUpdate.save();
            return this.res.status(200).send(taskToUpdate);
        } catch (error) {
            /* Checando se error é uma instância de new monggose.Error.castError.
            Para casos em que o id não foi passado corretamente e e não foi possível converter nosso id pra ObjectId */
            if (error instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            return this.res.status(500).send(error.message);
        }
    }
}
module.exports = TaskController;
