import { ValidationChain, body } from "express-validator"
import { Priority } from "../enums/Priority"
import { Status } from "../enums/Status"

export const taskValidator: ValidationChain[] = [
    body("title")
        .not()
        .isEmpty()
        .withMessage("The task title is required")
        .trim()
        .isString()
        .withMessage("Title needs to be in text format"),
    body("date")
        .not()
        .isEmpty()
        .withMessage("The task date is required")
        .isString()
        .withMessage("The date needs to be a valid date format"),
    body("description")
        .trim()
        .isString()
        .withMessage("Description needs to be in text format"),
    body("priority")
        .trim()
        .isIn([Priority.normal, Priority.high, Priority.low])
        .withMessage("Priority can only be normal, high or low"),
    body("status")
        .trim()
        .isIn([Status.todo, Status.inProgress, Status.completed])
        .withMessage("Status can only be todo, inProgress or completed")
]