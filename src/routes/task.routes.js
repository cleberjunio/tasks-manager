const express = require("express");
const router = express.Router();

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
    return new TaskController(req, res).updateTasks();
});

module.exports = router;
