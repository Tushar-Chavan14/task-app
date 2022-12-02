import { Router } from "express";
import { taskModel } from "../db/models/taskModel.js";
import auth from "../middleware/auth.js";

export const taskRouter = Router();

taskRouter.post("/tasks", auth, async (req, res) => {
  // const tasks = new taskModel(req.body);

  const tasks = new taskModel({ ...req.body, owner: req.user._id });

  try {
    const task = await tasks.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

taskRouter.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await taskModel.find({ owner: req.user._id });
    res.send(tasks);
  } catch (e) {
    res.sendStatus(500);
  }
});

taskRouter.get("/tasks/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const task = await taskModel.findOne({ _id, owner: req.user._id });
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
    // const updatedTask = await taskModel.findByIdAndUpdate(id, updateTask, {
    //   runValidators: true,
    //   new: true,
    // });

    const updatedTask = await taskModel.findById(id);

    updates.forEach((update) => {
      updatedTask[update] = updateTask[update];
    });

    await updatedTask.save();

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
