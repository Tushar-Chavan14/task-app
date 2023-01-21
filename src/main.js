import express from "express";
import cors from "cors";
import { taskRouter } from "./routers/taskRouters.js";
import { connectDb } from "./db/mongoose.js";
import { userRouter } from "./routers/userRouters.js";

await connectDb();
export const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
app.use(userRouter);
app.use(taskRouter);
