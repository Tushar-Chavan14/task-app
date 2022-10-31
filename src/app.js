import express from "express";
import "./db/mongoose.js";
import { taskRouter } from "./routers/taskRouters.js";
import { userRouter } from "./routers/userRouters.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

import bcrypt from "bcryptjs";

const pHash = async (password) => {
  const hash = await bcrypt.hash(password, 8);

  console.log(hash);

  console.log(await bcrypt.compare(password, hash));
};

pHash("tushar");
