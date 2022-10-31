import { Router } from "express";
import { userModel } from "../db/models/usersModel.js";

export const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.get("/users", async (req, res) => {
  try {
    const users = await userModel.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await userModel.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

userRouter.patch("/users/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  const updates = Object.keys(data);
  const allowedUpdates = ["name", "age", "email", "password"];

  const isvalidopration = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isvalidopration) {
    return res.status(400).send({ erro: "the update parameter does'nt exist" });
  }

  try {
    const updatedUser = await userModel.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedUser) {
      return res.sendStatus(404);
    }
    res.send(updatedUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.delete("/users/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const delUser = await userModel.findByIdAndDelete(id);
    if (!delUser) {
      return res.status(404).send();
    }
    res.send(delUser);
  } catch (e) {
    res.status(500);
  }
});
