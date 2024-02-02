import { User } from "../models/userModels.js";
import { catchAsyncErrors } from "../middlewires/catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";
export const isAthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401))
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
  req.user = await User.findById(decoded.id)
  next();
})