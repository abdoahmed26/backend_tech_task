import { Request, Response } from "express"
import Capsules from "../models/capsulesModel"
import { pagination } from "../middlewares/pagination";

export const getMyCapsules = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const limit = req.query.limit || 10;
        const page = req.query.page || 1;
        const skip = (+page - 1) * +limit
        const allCapsules = await Capsules.find({userId})
        const capsules = await Capsules.find({userId}).limit(+limit).skip(skip)
        const count = allCapsules.length
        const pagin = pagination(+limit, +page, count)
        res.status(200).json({status:"success",data: capsules,pagination:pagin})
    } catch (error) {
        res.status(500).json({status:"error",message: error})
    }
}

export const createCapsule = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).user.id
        const capsule = new Capsules({...req.body,userId})
        await capsule.save()
        res.status(201).json({status:"success",data: capsule})
    } catch (error) {
        res.status(500).json({status:"error",message: error})
    }
}

export const getOneCapsule = async (req: Request, res: Response) => {
    try {
        const capsuleId = req.params.id
        const userId = (req as any).user.id
        const capsule = await Capsules.findById(capsuleId)
        if(!capsule) {
            res.status(400).json({status:"error",message: "Capsule not found"})
        }
        else{
            if(capsule.userId.toString() !== userId) {
                const isReleased = new Date() >= new Date(capsule.release_date);
                if(isReleased) {
                    res.status(200).json({status:"success",data: {
                        _id: capsule._id,
                        title: capsule.title,
                        text: capsule.text,
                        image: capsule.image,
                        release_date: capsule.release_date,
                        userId: capsule.userId,
                        isReleased
                    }})
                }
                else{
                    res.status(200).json({status:"success",data: {
                        _id: capsule._id,
                        title: capsule.title,
                        release_date: capsule.release_date,
                        userId: capsule.userId,
                        isReleased
                    }})
                }
            }
            else{
                res.status(200).json({status:"success",data: {
                    _id: capsule._id,
                    title: capsule.title,
                    text: capsule.text,
                    image: capsule.image,
                    release_date: capsule.release_date,
                    userId: capsule.userId,
                    isReleased:true
                }})
            }
        }
    } catch (error) {
        res.status(500).json({status:"error",message: error})
    }
}

export const updateCapsule = async (req: Request, res: Response) => {
    try {
        const capsule = await Capsules.findOneAndUpdate({_id:req.params.id,userId:(req as any).user.id},req.body,{new:true})
        if(!capsule) {
            res.status(400).json({status:"error",message: "Capsule not found"})
        }
        else{
            res.status(200).json({status:"success",data: capsule})
        }
    } catch (error) {
        res.status(500).json({status:"error",message: error})
    }
}

export const deleteCapsule = async (req: Request, res: Response) => {
    try {
        const capsule = await Capsules.findOneAndDelete({_id:req.params.id,userId:(req as any).user.id})
        if(!capsule) {
            res.status(400).json({status:"error",message: "Capsule not found"})
        }
        else{
            res.status(200).json({status:"success",message: "Capsule deleted"})
        }
    } catch (error) {
        res.status(500).json({status:"error",message: error})
    }
}