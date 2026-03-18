const mongoose = require("mongoose");
require("dotenv").config();

// Σύνδεση MongoDB πριν αρχίσουν τα tests
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

// Κλείσιμο σύνδεσης μετά τα tests
afterAll(async () => {
  await mongoose.connection.close();
});