import express from "express"
import { deleteJob, getAllJobs, getMyJobs, postJob, updateJob } from "../controllers/jobController.js"
import { isAthenticated } from "../middlewires/auth.js"

const router = express.Router();
router.get("/getall", getAllJobs);
router.post("/post", isAthenticated, postJob);
router.get("/getjob", isAthenticated, getMyJobs);
router.put("/update/:id", isAthenticated, updateJob);
router.delete("/delete/:id", isAthenticated, deleteJob);

export default router;