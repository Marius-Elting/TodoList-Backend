import { TaskController } from './../controller/taskController';
import { Router, Request, Response } from "express";


export const tasksRouter: Router = Router()

tasksRouter.get("/get", async (_: Request, res: Response) => {
    const taskController = new TaskController()
    const allTasks = await taskController.gettAll()
    res.json(allTasks)
})
