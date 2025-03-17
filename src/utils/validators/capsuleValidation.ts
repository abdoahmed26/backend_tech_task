import { body } from "express-validator";

export const capsuleValidation = [
    body('title')
        .notEmpty()
        .withMessage('title is required'),
    body('release_date')
        .notEmpty()
        .withMessage('release_date is required')
        .isDate()
        .withMessage('release_date is invalid date')
]