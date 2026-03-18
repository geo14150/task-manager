const request  = require("supertest");
const mongoose = require("mongoose");
const app      = require("../app");
const User     = require("../models/User");
require("dotenv").config();

describe("🔐 Auth Endpoints", () => {
  const testUser = {
    name:     "Test User",
    email:    `test_${Date.now()}@test.com`,
    password: "123456",
  };

  // Αποθηκεύουμε το token εδώ — κοινό για όλα τα tests
  let token = null;

  // Σύνδεση MongoDB πριν τα tests
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
  });

  // Καθαρισμός test user & κλείσιμο σύνδεσης
  afterAll(async () => {
    await User.deleteOne({ email: testUser.email });
    await mongoose.connection.close();
  });

  it("POST /api/auth/register — δημιουργεί νέο user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // ← Αποθήκευσε το token
  });

  it("POST /api/auth/login — συνδέεται με σωστά credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: testUser.password });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token; // ← Ανανέωσε το token
  });

  it("POST /api/auth/login — αποτυγχάνει με λάθος password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: testUser.email, password: "wrongpass" });

    expect(res.statusCode).toBe(401);
  });

  it("GET /api/auth/me — επιστρέφει το profile", async () => {
    // Αν το token δεν υπάρχει, κάνε login πρώτα
    if (!token) {
      const login = await request(app)
        .post("/api/auth/login")
        .send({ email: testUser.email, password: testUser.password });
      token = login.body.token;
    }

    const res = await request(app)
      .get("/api/auth/me")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testUser.email);
  });
});