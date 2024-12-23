import express from "express";
import {
  createcontent,
  deletecontent,
  editcontent,
  getcontent,
} from "../controllers/brainController";

const router = express.Router();

router.get("/getcontent", getcontent);
router.post("/createcontent", createcontent);
router.delete("/deletecontent", deletecontent);
router.put("/editcontent", editcontent);

export default router;
