import supertest from "supertest";
import { app } from "../src/main.js";
import { taskModel } from "../src/db/models/taskModel";
import {
  setupDatabase,
  userOne,
  userOneId,
  usertwo,
  testTaskOne,
} from "./fixtures/db.js";

beforeEach(setupDatabase);

test("should create task for user", async () => {
  const response = await supertest(app)
    .post("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: "from test task",
    })
    .expect(201);

  const task = await taskModel.findById(response.body._id);
  expect(task).not.toBeNull();
  expect(task.completed).toEqual(false);
});

test("should get all tasks", async () => {
  const response = await supertest(app)
    .get("/tasks")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  expect(response.body.length).toBe(2);
});

test("should not delete task of user one", async () => {
  await supertest(app)
    .delete(`/tasks/${testTaskOne._id}`)
    .set("Authorization", `Bearer ${usertwo.tokens[0].token}`)
    .send()
    .expect(404);

  const tasks = await taskModel.findById(testTaskOne._id);
  expect(tasks._id).not.toBeNull();
});
