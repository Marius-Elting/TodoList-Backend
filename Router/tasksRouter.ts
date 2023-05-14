import { taskController } from './../controller/taskController';
import { Router } from "express";
import { taskValidator, updateValidator } from '../src/Validator Schema/TaskValidator';


export const tasksRouter: Router = Router()

tasksRouter.get("/get", taskController.gettAll)

tasksRouter.post("/post", taskValidator, taskController.create)

tasksRouter.put(
    '/put',
    updateValidator,
    taskController.update,
);

