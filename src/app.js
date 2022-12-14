import express from "express";
import cors from "cors";
import { connectDb } from "./db/mongoose.js";
import { taskRouter } from "./routers/taskRouters.js";
import { userRouter } from "./routers/userRouters.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

connectDb().then(
  app.listen(port, () => console.log(`Example app listening on port ${port}!`))
);
