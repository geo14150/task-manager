const request  = require("supertest");
const mongoose = require("mongoose");
const app      = require("../app");
const User     = require("../models/User");
const Task     = require("../models/Task");
require("dotenv").config();

describe("📋 Task Endpoints", () => {
  let token  = null;
  let taskId = null;
  const testEmail = `tasks_${Date.now()}@test.com`;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);

    // Δημιουργία test user
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Task Tester", email: testEmail, password: "123456" });

    token = res.body.token;
  });

  afterAll(async () => {
    // Καθαρισμός test data
    await User.deleteOne({ email: testEmail });
    await Task.deleteMany({ title: "Test Task" });
    await mongoose.connection.close();
  });

  it("POST /api/tasks — δημιουργεί task", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Task", description: "Test", status: "todo", priority: "high" });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe("Test Task");
    taskId = res.body._id;
  });

  it("GET /api/tasks — φέρνει τις tasks του user", async () => {
    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("PUT /api/tasks/:id — ενημερώνει task", async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "done" });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("done");
  });

  it("DELETE /api/tasks/:id — διαγράφει task", async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });

  it("GET /api/tasks — αποτυγχάνει χωρίς token", async () => {
    const res = await request(app).get("/api/tasks");
    expect(res.statusCode).toBe(401);
  });
});