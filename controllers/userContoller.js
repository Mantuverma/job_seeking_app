
import { User } from "../models/userModels.js";
import { catchAsyncErrors } from "../middlewires/catchAsyncError.js";
import ErrorHandler from "../middlewires/error.js"
import { sendToken } from "../utils/jwtToken.js"
export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password || !role) {
        return next(new ErrorHandler("Please fill full form!"));
    }
    const isEmail = await User.findOne({ email });
    if (isEmail) {
        return next(new ErrorHandler("Email already registered!"));
    }
    const user = await User.create({
        name,
        email,
        phone,
        password,
        role,
    });
    sendToken(user, 201, res, "User Registered!");
});


export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return next(new ErrorHandler("Please provide emai password and role"))
    }

    const user = await User.findOne({ email }).select("+passord");
    if (!user) {
        return next(new ErrorHandler("Invali Email or Password"))
    }
    const isPassword = await User.comparePassword(password);
    if (!isPassword) {
        return next(new ErrorHandler("Invalid Email or Password"))
    }
    if (user.role !== role) {
        return next(new ErrorHandler(`User with Provided  email and ${role} Not Found !!`))
    }
    sendToken(user, 201, res, "User Logged In!");

})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(201).cookie("token", "", {
        httpOnly: true,
        expires: new Date(Date.now()),
    })
        .json({
            success: true,
            message: "Logged Out Successfully"
        });
})



















