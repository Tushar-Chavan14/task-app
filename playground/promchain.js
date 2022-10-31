import "../src/db/mongoose.js";
import { taskModel } from "../src/db/models/taskModel.js";

// taskModel
//   .findByIdAndDelete("632f60685623165fbd965d49")
//   .then((res) => {
//     console.log(res);
//     return taskModel.countDocuments({ completed: false });
//   })
//   .then((res2) => {
//     console.log(res2);
//   })
//   .catch((e) => console.log(e));

const deleteTaskAndCount = async (id) => {
  await taskModel.findByIdAndDelete(id);
  const count = await taskModel.countDocuments({ completed: false });
  return count;
};

deleteTaskAndCount("632ffe408e4590654475a98c")
  .then((count) => console.log(count))
  .catch((e) => console.log(e));
