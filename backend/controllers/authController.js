import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Restaurant from "../models/Restaurant.js";

const genToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, role, restaurant } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "Missing fields" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });

  const hash = await bcrypt.hash(password, 10);
  const status = role === "owner" ? "pending" : "active";
  const user = await User.create({ name, email, password: hash, role: role || "user", status });

  if (role === "owner" && restaurant) {
    await Restaurant.create({
      name: restaurant.name || `${name}'s Restaurant`,
      ownerId: user._id,
      address: restaurant.address || "NA",
      cuisine: restaurant.cuisine || "",
      deliveryTime: restaurant.deliveryTime || 30,
      deliveryFee: restaurant.deliveryFee || 0,
      status: "pending"
    });
  }

  return res.status(201).json({ message: "Registered", status: user.status });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  if (user.role === "owner" && user.status !== "active") {
    return res.status(403).json({ message: "Owner not approved yet" });
  }

  const token = genToken(user._id);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role, status: user.status }
  });
});
