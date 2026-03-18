const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Βοηθητική συνάρτηση για δημιουργία token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// @POST /api/auth/register
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Το email χρησιμοποιείται ήδη" });
    }

    const user = await User.create({ name, email, password });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @POST /api/auth/login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    console.log("USER FOUND:", user);

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Λάθος email ή κωδικός" });
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

// @GET /api/auth/me
const getMe = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error("GETME ERROR:", error);
    res.status(500).json({ message: error.message || "Server error" });
  }
};

module.exports = { register, login, getMe };