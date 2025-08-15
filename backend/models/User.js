import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Invalid email"]
    },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "owner", "user"], default: "user" },
    status: { type: String, enum: ["active", "pending", "disabled"], default: "active" }
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
