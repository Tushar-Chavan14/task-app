import supertest from "supertest";
import { app } from "../src/main.js";
import { userModel } from "../src/db/models/usersModel.js";
import { setupDatabase, userOne, userOneId } from "./fixtures/db.js";

beforeEach(setupDatabase);

test("should create user", async () => {
  const response = await supertest(app)
    .post("/users")
    .send({
      name: "pada",
      email: "pada6945@chatizoe.com",
      password: "ntorq1256",
    })
    .expect(201);

  const user = await userModel.findById(response.body.user._id);

  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: "pada",
    },
  });

  expect(user.password).not.toBe("ntorq1256");
});

test("should login exixting user", async () => {
  const response = await supertest(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);

  const user = await userModel.findById(userOneId);

  expect(response.body.token).toBe(user.tokens[1].token);
});

test("should not login non existing user", async () => {
  await supertest(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "test1234",
    })
    .expect(400);
});

test("should show profile", async () => {
  await supertest(app)
    .get("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test("should not show profile", async () => {
  await supertest(app).get("/users/me").send().expect(400);
});

test("should delete the user", async () => {
  await supertest(app)
    .delete("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await userModel.findById(userOneId);

  expect(user).toBeNull();
});

test("should not delete the user", async () => {
  await supertest(app).delete("/users/me").send().expect(400);
});

test("should upload avtar image", async () => {
  await supertest(app)
    .post("/users/me/avatar")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .attach("avatar", "tests/fixtures/profile-pic.jpg")
    .expect(200);

  const user = await userModel.findById(userOneId);

  expect(user.avatar).toEqual(expect.any(Buffer));
});

test("should update valid user", async () => {
  await supertest(app)
    .patch("/users/me")
    .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
    .send({ name: "testUserU" })
    .expect(200);

  const user = await userModel.findById(userOneId);

  expect(user.name).toBe("testUserU");
});

test("should update valid user", async () => {
  await supertest(app)
    .patch("/users/me")
    .send({ name: "testUserU" })
    .expect(400);
});
