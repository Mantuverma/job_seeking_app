const catchAsyncErrors = (requestHandler) => {
    
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err))
    }
}
export {catchAsyncErrors };







// const asyncHandler = (fn) =>async(req,res,next)=>{
//     try {
//         await fn(req,res,next);
//     } catch (error) {
//         res.status(error.code || 500).jso({
//             success :false,
//             message:error.message
//         })
        
//     }
// } 