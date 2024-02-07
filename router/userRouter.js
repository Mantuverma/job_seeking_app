import { Router } from "express";
import { isAthenticated } from "../middlewires/auth.js"
import { register, login, logout, getUser } from "../controllers/userContoller.js";

const router = Router();

router.post("/register", register)
router.post("/login", login)
router.get("/logout", isAthenticated, logout)
router.get("/getuser", isAthenticated, getUser)

export default router;