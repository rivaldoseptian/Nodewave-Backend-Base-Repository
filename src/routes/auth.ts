import { Router } from "express";
import jwt from "jsonwebtoken";
import db from "../utils/db";
import bcrypt from "bcryptjs";

const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await db("users").where({ username }).first();

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  const existing = await db("users").where({ username }).first();
  if (existing) {
    return res.status(409).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await db("users").insert({ username, password: hashedPassword });

  res.status(201).json({ message: "User registered successfully" });
});

export default router;
