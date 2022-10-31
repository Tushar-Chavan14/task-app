import "../src/db/mongoose.js";
import { userModel } from "../src/db/models/usersModel.js";

// userModel
//   .findByIdAndUpdate("63300e98dfef39ff6cc5c47c", { age: 18 })
//   .then((user) => {
//     console.log(user);
//     return userModel.countDocuments({ age: 22 });
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

const updateUser = async (id, age) => {
  await userModel.findByIdAndUpdate(id, { age });
  const count = userModel.countDocuments({ age });
  return count;
};

updateUser("63300e98dfef39ff6cc5c47c", 20)
  .then((count) => {
    console.log(count);
  })
  .catch((e) => {
    console.log(e);
  });
