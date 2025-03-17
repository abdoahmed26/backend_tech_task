import express from 'express'
import { loginValidation } from '../utils/validators/loginValidation'
import { errorValidation } from '../utils/validators/errorValidation'
import { login, register } from '../controllers/authController'
import { registerValidation } from '../utils/validators/registerValidation'

export const authRouter = express.Router()

authRouter.post("/login",loginValidation,errorValidation,login)

authRouter.post("/register",registerValidation,errorValidation,register)