const createError = require("../utils/createError");

exports.getMe = async (req,res,next) => {
    try {

        const user = JSON.parse(JSON.stringify(req.user));
        if(!user){
            createError('user not found', 400)
        }
        console.log(req.user);
        res.status(200).json({user})
    } catch (error) {
        next(error)
    }
}