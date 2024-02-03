import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, "please provide a title"],
        minLength: [3, "Title must contain at least 3 charators !"],
        maxLength: [50, "Tile concont exceed 50 Charactor !"]
    },
    description: {
        type: String,
        required: [true, "please provide a description"],
        minLength: [30, "Title must contain at least 30 charators !"],
        maxLength: [350, "Tile concont exceed 350 Charactor !"]
    },
    category: {
        type: String,
        required: [true, "please provide a Job Catagory"]
    },
    country: {
        type: String,
        required: [true, "please provide a Country"]
    },
    city: {
        type: String,
        required: [true, "please provide a city"]
    },
    location: {
        type: String,
        required: [true, "please provide a location"],
        minLength: [10, "Location must contain at least 30 charators !"]

    },
    fixedSalary: {
        type: String,
        minLength: [3, "Title must contain at least 3 digit !"],
        maxLength: [10, "Tile concont exceed 10 digits !"]
    },
    salaryFrom: {
        type: String,
        minLength: [3, "Title must contain at least 3 digit !"],
        maxLength: [10, "Tile concont exceed 10 digits !"]
    },
    salaryTo: {
        type: String,
        minLength: [3, "Title must contain at least 3 digit !"],
        maxLength: [10, "Tile concont exceed 10 digits !"]
    },
    expired: {
        type: Boolean,
        default: false
    },
    jobPostedOn: {
        type: Date,
        default: Date.now,
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },

}, { timestamps: true });

export const Job = mongoose.model("Job", jobSchema);