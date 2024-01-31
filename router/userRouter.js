import { Router } from "express";
import { register } from "../controllers/userContoller.js";

const router = Router();

router.post("/regist", register)

export default router;