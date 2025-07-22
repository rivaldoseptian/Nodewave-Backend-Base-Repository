import { Router } from "express";
import { authenticate } from "../middlewares/auth";
import { getFiles } from "../services/fileService";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  const { page = 1, limit = 10, status, filename } = req.query;

  const result = await getFiles({
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
    status: status as string,
    filename: filename as string,
  });

  res.json(result);
});

export default router;
