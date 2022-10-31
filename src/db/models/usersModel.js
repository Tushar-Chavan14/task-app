import mongoose from "mongoose";
import validator from "validator";

export const userModel = mongoose.model("users", {
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("invalid email");
      }
    },
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) throw new Error("age must be positive");
    },
  },
  password: {
    type: String,
    trim: true,
    minLength: 6,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("the password cannot hold the sting password");
      }
    },
  },
});
