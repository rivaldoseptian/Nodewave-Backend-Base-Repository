import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { saveFileMeta, processFileAsync } from "../services/fileService";

const router = Router();

router.post("/", authenticate, async (req, res) => {
  const { filename } = req.body;

  if (!filename)
    return res.status(400).json({ message: "Filename is required" });

  const file = await saveFileMeta(filename);
  processFileAsync(file.id);

  res.json({ success: true, fileId: file.id });
});

export default router;
