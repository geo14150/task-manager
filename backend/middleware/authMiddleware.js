const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Πάρε το token από το header
      token = req.headers.authorization.split(" ")[1];

      // Επαλήθευσε το token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Βρες τον user (χωρίς το password)
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      return res.status(401).json({ message: "Μη εξουσιοδοτημένος χρήστης" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Δεν υπάρχει token" });
  }
};

module.exports = { protect };