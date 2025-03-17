import { body } from "express-validator";

export const loginValidation = [
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
]