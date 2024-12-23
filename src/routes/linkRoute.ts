import express from "express";
import { createlink, sharelink } from "../controllers/linkController";

const router = express.Router();

router.get("/:shareLink", sharelink);
router.post("/createlink", createlink);

export default router;
