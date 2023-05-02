import { TaskController } from './../controller/taskController';
import { Router, Request, Response } from "express";
import { taskValidator } from '../src/Validator Schema/TaskValidator';
import { validationResult } from 'express-validator';

export const tasksRouter: Router = Router()

tasksRouter.get("/get", async (_: Request, res: Response) => {
    const taskController = new TaskController()
    const allTasks = await taskController.gettAll()
    res.json(allTasks)
})

tasksRouter.post("/post",
    taskValidator,
    async (req: Request, res: Response) => {
        const result = validationResult(req)
        console.log(result)
        if (result.array().length > 0) {
            res.status(401).json(result.array())
            return
        }
        res.end()
    }
)
