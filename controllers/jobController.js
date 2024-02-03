import { catchAsyncErrors } from "../middlewires/catchAsyncError.js"
import ErrorHandler from "../middlewires/error.js"
import { Job } from "../models/jobModel.js"

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })

    res.status(200).json({
        success: true,
        jobs
    });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(
            new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
        );
    }
    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;
    console.log(`title : ${title}\n description : ${description} \n category :${category} \n
    country : ${country} \n city :${city} \n and loction : ${location}`)
    if (!title || !description || !category || !country || !city || !location) {
        return next(new ErrorHandler("Please provide full job details.", 400));
    }


    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(new ErrorHandler("Please Provide Salary details ", 400))

    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(new ErrorHandler("Con not enter fixed Salary and range salary", 400))

    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });

    res.status(200).json({
        success: true,
        message: "Job Posted Successfully",
        job
    })
})

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("JOb seeker is not allowed to access thid resources", 400));

    }
    const myJobs = await Job.find({ postedBy: req.user._id })
    res.status(200).json({
        success: true,
        myJobs,
    });
});


export const updateJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resources", 400))

    }
    const { id } = req.params;
    let job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("OOPs ! Job not Found !", 404))

    }
    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    res.status(200).json({
        success: true,
        message: "Job details updated Successfully"
    })
})

export const deleteJob = catchAsyncErrors(async (req, res, next) => {

    const { role } = req.user;
    if (role === "Job Seeker") {
        return next(new ErrorHandler("Job Seeker is not allowed to access this resource", 400))

    }
    const { id } = req.params
    const job = await Job.findById(id);
    if (!job) {
        return next(new ErrorHandler("OOPs ! Job not Found", 404));
    }
    await job.deleteOne();
    res.status(200).json({
        success: true,
        message: "Job deleted Successfully"
    });

});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new ErrorHandler("Job not found .", 404))
        }
        res.status(200).json({
            success: true,
            job
        });
    }
    catch (error) {
        return next(new ErrorHandler("Invalid Id /CastError", 404))
    }
})
