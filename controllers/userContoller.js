import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/userModels.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js"

export const register = asyncHandler(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
        return new ApiError(400, "Please fill full form!");
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return new ApiError(409, "Email already registered!");
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    return res.status(201).json(
        new ApiResponse(200, user, "User registered Successfully")
    )
});


















// export const login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password, role } = req.body;
//   if (!email || !password || !role) {
//     return next(new ErrorHandler("Please provide email ,password and role."));
//   }
//   const user = await User.findOne({ email }).select("+password");
//   if (!user) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }
//   const isPasswordMatched = await user.comparePassword(password);
//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid Email Or Password.", 400));
//   }
//   if (user.role !== role) {
//     return next(
//       new ErrorHandler(`User with provided email and ${role} not found!`, 404)
//     );
//   }
//   sendToken(user, 201, res, "User Logged In!");
// });

// export const logout = catchAsyncErrors(async (req, res, next) => {
//   res
//     .status(201)
//     .cookie("token", "", {
//       httpOnly: true,
//       expires: new Date(Date.now()),
//     })
//     .json({
//       success: true,
//       message: "Logged Out Successfully.",
//     });
// });


// export const getUser = catchAsyncErrors((req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });