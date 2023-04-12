import { Router } from "express";
import { userModel } from "../db/models/usersModel.js";
import auth from "../middleware/auth.js";
import multer from "multer";
import sharp from "sharp";
import { thankyouMail, welcomeMail } from "../emails/accounts.js";

export const userRouter = Router();

userRouter.post("/users", async (req, res) => {
  const user = new userModel(req.body);

  try {
    await user.save();
    await welcomeMail(user.email);
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
    res.status(400).send({ error: "check your email and password" });
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

userRouter.patch("/users/me", auth, async (req, res) => {
  const updateUser = req.user;
  const data = req.body;

  const updates = Object.keys(data);
  const allowedUpdates = ["name", "age", "email", "password"];

  const isvalidopration = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isvalidopration) {
    return res
      .status(400)
      .send({ error: "the update parameter does'nt exist" });
  }

  try {
    updates.forEach((update) => {
      updateUser[update] = data[update];
    });

    await updateUser.save();

    res.send(updateUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

userRouter.delete("/users/me", auth, async (req, res) => {
  const user = req.user;

  try {
    const delUser = await user.remove();
    thankyouMail(user.email);
    res.status(200).send(delUser);
  } catch (e) {
    res.status(500);
  }
});

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("upload a image file"));
    }

    cb(undefined, true);
  },
});

userRouter.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 300, height: 300 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;
    await req.user.save();

    res.send({ sucess: "Profie uplaoded" });
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

userRouter.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();

  res.send({ sucess: "profile removed" });
});

userRouter.get("/users/me/avatar", auth, async (req, res) => {
  res.set("Content-Type", "image/png");
  res.send(req.user.avatar);
});
