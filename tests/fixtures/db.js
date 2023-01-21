import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from "../../src/db/models/usersModel";
import { taskModel } from "../../src/db/models/taskModel";

export const userOneId = mongoose.Types.ObjectId();

export const userOne = {
  _id: userOneId,
  name: "testUser",
  email: "testuser@mail.com",
  password: "test@1234",
  tokens: [
    {
      token: jwt.sign({ _id: userOneId }, process.env.JWTsecret),
    },
  ],
};

export const userTwoId = mongoose.Types.ObjectId();

export const usertwo = {
  _id: userTwoId,
  name: "testUserTwo",
  email: "testuserTwo@mail.com",
  password: "test@1234",
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId }, process.env.JWTsecret),
    },
  ],
};

export const testTaskOne = {
  _id: mongoose.Types.ObjectId(),
  description: "test task one",
  completed: false,
  owner: userOneId,
};

const testTasktwo = {
  _id: mongoose.Types.ObjectId(),
  description: "test task two",
  completed: false,
  owner: userOneId,
};

const testTaskThree = {
  _id: mongoose.Types.ObjectId(),
  description: "test task three",
  completed: false,
  owner: userTwoId,
};

export const setupDatabase = async () => {
  await userModel.deleteMany({});
  await taskModel.deleteMany({});
  await new userModel(userOne).save();
  await new userModel(usertwo).save();
  await new taskModel(testTaskOne).save();
  await new taskModel(testTasktwo).save();
  await new taskModel(testTaskThree).save();
};
