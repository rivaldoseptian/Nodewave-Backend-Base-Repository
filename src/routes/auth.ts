import { Router } from "express";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "nodewave") {
    const token = jwt.sign({ username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

export default router;
