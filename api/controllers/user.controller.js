import { errorHandler } from "../utils/errorHandler.js"
import { User } from '../models/user.model.js'
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'

export const handleSignup = async( req, res, next ) => {
    // Get data from body
    const { name, email, password } = req.body
    if( !name || !email || !password ){
       return next(errorHandler(400, "All fields are required"))
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return next(errorHandler(400, "User already exists."))
        }

        // Create a new user
        const user = await User.create({
            name,
            email,
            password
        })

        if(!user){
            return next(errorHandler(500, "User couldn't be created. Please try again."))
        }

        return res.status(200).json({
            success : true,
            message : "User created successfully."
        })

    } catch (error) {
        return next(error)
    }

}

export const handleSignin = async(req, res, next) => {
    // Get data from body
    const { email , password } = req.body;
    if(!email || !password){
        return next(errorHandler(400, "All fields required"));
    }
    try {
        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return next(errorHandler(400, "User doesn't exist."));
        }
        // Match passwords using bcrypt
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return next(errorHandler(400, "Something went wrong."))
        }
        // generate jwt and set cookie
        const payload = {
            id : user._id
        }
        const token = jwt.sign(payload,process.env.JWT_SECRET_KEY, {
            expiresIn :24 * 60 * 60 * 1000
        })
        res.cookie("token", token, {
            httpOnly : true,
            maxAge : 24 * 60 * 60 * 1000
        } )

        return res.status(200).json({
            success : true,
            message : "Logged in successfully."
        })
        
    } catch (error) {
        return next(error)
    }
}

export const handleLogout = async(req, res, next) => {
    const user = req.user;
    if(!user) {
        return next(errorHandler(400, "User not logged in."))
    }
    res.clearCookie("token", {
        httpOnly : true,
    })

    return res.status(200).json({
        success : true,
        message : "Logged out successfully"
    })
}

export const getMe = async(req, res, next) => {
    const { id } = req.user
    if(!id){
        return next(errorHandler(400, 'Something went wrong.'))
    }

    try {
        const user = await User.find({_id : id}, " -password -createdAt -updatedAt ");
        if(!user){
            return next(errorHandler(400, "User doesn't exist."))
        }

        return res.status(200).json({
            success : true,
            user
        })

    } catch (error) {
        return next(error)
    }
}
