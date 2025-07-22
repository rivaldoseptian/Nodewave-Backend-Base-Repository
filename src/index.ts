import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth";
import uploadRoutes from "./routes/upload";
import fileRoutes from "./routes/files";
import { initializeDatabase } from "./utils/initDb";

dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

// ✅ Tambahkan middleware penting
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/upload", uploadRoutes);
app.use("/files", fileRoutes);

// Optional: root route handler
app.get("/", (_, res) => {
  res.send("Nodewave Backend API is running!");
});

// Initialize DB and start server
(async () => {
  try {
    await initializeDatabase();
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
})();
