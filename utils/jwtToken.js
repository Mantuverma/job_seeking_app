export const sendToken = (user, statusCode, res, message) => {
    try {
        const token = user.getJWTToken();
        console.log("Function is working up to this point");

        // Assuming process.env.COOKIE_EXPIRE is the number of days
        const expiresInDays = parseInt(process.env.COOKIE_EXPIRE, 10);

        if (isNaN(expiresInDays)) {
            throw new Error("Invalid value for COOKIE_EXPIRE");
        }

        const options = {
            expires: new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        // Set the cookie using the cookie method
        res.cookie("token", token, options);

        // Send the response with status and JSON payload
        res.status(statusCode).json({
            success: true,
            user,
            message,
            token
        });
    } catch (error) {
        // Handle errors appropriately
        console.error("Error in sendToken function:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
};
