import { Request, Response } from "express"
import Users from "../models/usersModel"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken';

export const register = async(req:Request,res:Response) => {
    try {
        const {name,email,password} = req.body
        const olderUser = await Users.findOne({email})
        if(olderUser) {
            res.status(400).json({
                status: "error",
                message: "User already exists"
            })
        }
        else{
            const hashPassword = await bcrypt.hash(password, 10)
            const newUser = new Users({
                name,
                email,
                password: hashPassword
            })
            await newUser.save()
            res.status(201).json({
                status: "success",
                message: "User created successfully"
            })
        }
    } catch (error:any) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const login = async(req:Request,res:Response) => {
    try {
        const {email,password} = req.body
        const user = await Users.findOne({email})
        if(!user) {
            res.status(400).json({
                status: "error",
                message: "User not found"
            })
        }
        else{
            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) {
                res.status(400).json({
                    status: "error",
                    message: "password or email is incorrect"
                })
            }
            else{
                const token = jwt.sign({id: user._id, name: user.name, email: user.email}, process.env.JWT_SECRET as string, {expiresIn: "1d"})
                res.status(200).json({
                    status: "success",
                    message: "Login successful",
                    data:{token}
                })
            }
        }
    } catch (error:any) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}