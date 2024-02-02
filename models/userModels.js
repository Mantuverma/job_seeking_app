import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
        minLength: [3, "Name mnust contain at least 3 charactor"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Please enter your name"],
        validate: [validator.isEmail, "please provide valid Email"]
    },
    phone: {
        type: Number,
        required: [true, "Please enter your Phone number"]
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [8, "Password must contain at least 8 characters!"],
        select: false,
    },
    role: {
        type: String,
        required: [true, "Please select a role"],
        enum: ["Job Seeker", "Employer"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },


}, { timestamps: true });

// password encryption 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

// comparing the user password and enter password


userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// generating jwt token when user register

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1d',
    });
};

export const User = mongoose.model("User", userSchema);