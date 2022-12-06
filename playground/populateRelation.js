import { userModel } from "./db/models/usersModel.js";
import { taskModel } from "./db/models/taskModel.js";

const main = async () => {
  // const task = await taskModel.findById("638f704772a299cf2134f7e0");
  // await task.populate("owner");
  // console.log(task.owner);

  const Utasks = await userModel
    .findById("637fd5a9a5b734c0c0c710a4")
    .populate("Utasks");
  console.log(Utasks.Utasks);
};

main();
