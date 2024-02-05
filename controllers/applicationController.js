import { catchAsyncErrors } from "../middlewires/catchAsyncError.js"
import ErrorHandler from "../middlewires/error.js";
import { Application } from "../models/applicationModels.js";
import { Job } from "../models/jobModel.js";

export const postApplication = catchAsyncErrors(async (req, res, next) => {

    const { role } = req.user;
    if (role === "Employer") {
        return next(new ErrorHandler("Employer is  not allowed to access  this resource", 400))
    }

    const resumeLocalPath = req.files?.resume[0]?.path;
    // if (!req.files || Object.keys(req.files).length === 0) {
    //     return next(new ErrorHandler("Please Select Resume !"))
    // }
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.resume) && req.files.resume.length > 0) {
        coverImageLocalPath = req.files.resume[0].path
    }

    if (!resumeLocalPath) {
        return next(new ErrorHandler("Please Select Resume !"));
    }
    const resume = await uploadOnCloudinary(resumeLocalPathLocalPath)
    if (!resume) {
        return next(new ErrorHandler("Please Select Resume !"));
    }



})