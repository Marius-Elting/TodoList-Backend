import { taskController } from './../controller/taskController';
import { Router, Request, Response } from "express";
import { taskValidator } from '../src/Validator Schema/TaskValidator';
import { validationResult } from 'express-validator';

export const tasksRouter: Router = Router()

tasksRouter.get("/get", taskController.gettAll)


tasksRouter.post("/post", taskValidator, taskController.create)
