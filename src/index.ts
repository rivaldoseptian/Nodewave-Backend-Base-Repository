import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import fileRoutes from "./routes/files";
import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
