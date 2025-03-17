import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    if(!req.headers.authorization) {
        res.status(401).json({status:"error",message: 'Unauthorized'})
    }
    else{
        const token = req.headers.authorization.split(' ')[1]
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
                if(err) {
                    res.status(401).json({status:"error",message: err.message})
                }
                else {
                    (req as any).user = user
                    next()
                }
            })
        }
        else {
            res.status(401).json({status:"error",message: 'Unauthorized'})
        }
    }
}