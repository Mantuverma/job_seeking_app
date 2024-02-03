import express from "express";
import cors from "cors"
import morgan from "morgan"
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import userRouter from "./router/userRouter.js"
import jobRouter from "./router/jobRouters.js"
const app = express();

app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        method: ["GET", "POST", "DELETE", "PUT"],
        credentials: true,
    })
);

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan('dev'))
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
)
app.use("/api/v1/user", userRouter)
app.use("/api/v1/jobs", jobRouter)

export { app };
