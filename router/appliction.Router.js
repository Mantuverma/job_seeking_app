import { postApplication } from "../controllers/applicationController.js";
import { upload } from "../middlewares/multer.middlewares.js"
import { Router } from "express"


const router = Router()

router.route("/appliction").post(
    upload.fields([
        {
            name: "resume",
            maxCount: 1
        }
    ]),
    postApplication);


export default router