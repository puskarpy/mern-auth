import jwt from 'jsonwebtoken'
import { errorHandler } from '../utils/errorHandler.js';

export const isLoggedIn = async(req, res, next) => {
try {
    //get cookie-data
    const token = req.cookies?.token;

    if(!token){
        return next(errorHandler(400, "User not logged in."))
    }
    //verify jwt
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    // add decodeddata to req.user
    req.user = decodedData;
    return next()
} catch (error) {
    return next(error)
}
}