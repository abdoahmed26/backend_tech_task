import { body } from "express-validator";

export const registerValidation = [
    body('name')
        .notEmpty()
        .withMessage('name is required'),
    body('email')
        .notEmpty()
        .withMessage('email is required')
        .isEmail()
        .withMessage('email is invalid'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
        .isLength({max: 12})
        .withMessage('Password must be at most 12 characters long')
]