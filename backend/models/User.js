const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Το όνομα είναι υποχρεωτικό"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Το email είναι υποχρεωτικό"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Ο κωδικός είναι υποχρεωτικός"],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// ✅ Χρησιμοποιούμε function() και όχι arrow function
userSchema.pre("save", async function () {
  // Αν ο κωδικός δεν έχει αλλάξει, σταμάτα εδώ
  if (!this.isModified("password")) {
    return; // Απλό return, όχι next()
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    // Δεν χρειάζεται να καλέσεις next() στο τέλος
  } catch (error) {
    // Στις async συναρτήσεις, αν γίνει throw error, η Mongoose το πιάνει αυτόματα
    throw error; 
  }
});

// ✅ Method για έλεγχο password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);