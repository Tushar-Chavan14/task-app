import { Router } from "express";
import { userModel } from "../db/models/usersModel.js";
import auth from "./middleware/auth.js";

export const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    const token = await user.genrateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.post("/users/login", async (req, res) => {
  const credential = req.body;
  try {
    const user = await userModel.findByCredential(
      credential.email,
      credential.password
    );
    const token = await user.genrateAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.post("/users/logout", auth, async (req, res) => {
  const user = req.user;

  try {
    user.tokens = user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await user.save();

    res.send();
  } catch (e) {
    res.sendStatus(500);
  }
});

userRouter.post("/users/logoutall", auth, async (req, res) => {
  const user = req.user;
  try {
    user.tokens = [];
    await user.save();
    res.send();
  } catch (e) {
    res.sendStatus(500);
  }
});

userRouter.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
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
    // const updatedUser = await userModel.findByIdAndUpdate(id, data, {
    //   new: true,
    //   runValidators: true,
    // });

    const updatedUser = await userModel.findById(id);
    updates.forEach((update) => {
      updatedUser[update] = data[update];
    });

    await updatedUser.save();

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
