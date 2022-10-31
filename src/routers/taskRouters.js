import { Router } from "express";
import { taskModel } from "../db/models/taskModel.js";

export const taskRouter = Router();

taskRouter.post("/tasks", async (req, res) => {
  const tasks = new taskModel(req.body);

  try {
    const task = await tasks.save();
    res.status(201).send(task);
  } catch (e) {
    res.sendStatus(400);
  }
});

taskRouter.get("/tasks", async (req, res) => {
  try {
    const tasks = await taskModel.find({});
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

taskRouter.get("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const task = await taskModel.findById(id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.send(task);
  } catch (e) {
    res.sendStatus(500);
  }
});

taskRouter.patch("/tasks/:id", async (req, res) => {
  const id = req.params.id;
  const updateTask = req.body;

  const updates = Object.keys(updateTask);
  const allowedUpdates = ["description", "completed"];

  const isvalidopration = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isvalidopration) {
    return res.status(400).send({ error: "Invalid update parameter" });
  }

  try {
    const updatedTask = await taskModel.findByIdAndUpdate(id, updateTask, {
      runValidators: true,
      new: true,
    });

    if (!updatedTask) {
      return res.sendStatus(404);
    }
    res.send(updatedTask);
  } catch (e) {
    res.status(400).send();
  }
});

taskRouter.delete("/tasks/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const delTask = await taskModel.findByIdAndDelete(id);
    if (!delTask) {
      return res.sendStatus(404);
    }
    res.send(delTask);
  } catch (e) {
    res.status(500).send();
  }
});
