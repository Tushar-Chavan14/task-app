import express from "express";
import cors from "cors";
import "./db/mongoose.js";
import { taskRouter } from "./routers/taskRouters.js";
import { userRouter } from "./routers/userRouters.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import { userModel } from "./db/models/usersModel.js";
import { taskModel } from "./db/models/taskModel.js";

const main = async () => {
  // const task = await taskModel.findById("636c09f932addc1469e048db");
  // await task.populate("owner");
  // console.log(task.owner);

  const Utasks = await userModel
    .findById("636c0a1c32addc1469e048dd")
    .populate("Utasks");
  console.log(Utasks.Utasks);
};

main();
