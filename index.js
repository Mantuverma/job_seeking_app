import connectDB from "./database/dbConnection.js";
import { app } from "./app.js";
import { DB_NAME } from "./utils/constant.js"

import dotenv from "dotenv"
dotenv.config({
    path: './.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(` Server is running at port : ${process.env.PORT} with ${DB_NAME}`);
        })
    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    })




