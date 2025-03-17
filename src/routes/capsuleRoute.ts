import express from 'express'
import { verifyToken } from '../middlewares/verifyToken'
import { upload, uploadFile } from '../middlewares/uploadFile'
import { createCapsule, deleteCapsule, getMyCapsules, getOneCapsule, updateCapsule } from '../controllers/capsuleController'
import { capsuleValidation } from '../utils/validators/capsuleValidation'
import { errorValidation } from '../utils/validators/errorValidation'

export const capsuleRouter = express.Router()

capsuleRouter.route('/')
.get(verifyToken,getMyCapsules)
.post(verifyToken,upload.single('image'),uploadFile,capsuleValidation,errorValidation,createCapsule)

capsuleRouter.route('/:id')
.get(verifyToken,getOneCapsule)
.put(verifyToken,upload.single('image'),uploadFile,updateCapsule)
.delete(verifyToken,deleteCapsule)
