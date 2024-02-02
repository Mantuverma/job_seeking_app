import { Router } from "express";
import { isAthenticated } from "../middlewires/auth.js"
import { register, login, logout } from "../controllers/userContoller.js";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", isAthenticated, logout)

export default router;