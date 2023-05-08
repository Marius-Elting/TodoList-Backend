
import { Task } from "../src/Entitys/tasks.entity";
import { AppDataSource } from "..";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { Response, Request } from "express";
import { validationResult } from "express-validator";
import { UpdateResult } from 'typeorm';
class TaskController {

    public async gettAll(req: Request, res: Response): Promise<Response> {
        let allTasks: Task[]
        try {
            allTasks = await AppDataSource.getRepository(Task).find({
                order: {
                    date: "ASC"
                }
            })
            allTasks = instanceToPlain(allTasks) as Task[]
            return res.json(allTasks)
        } catch (err) {
            res.status(500).json({ error: "Internal Server Error" })
            throw (err)
        }
    }


    public async create(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }
        const newTask = new Task()
        newTask.title = req.body.title
        newTask.date = req.body.date
        newTask.description = req.body.description
        newTask.priority = req.body.priority
        newTask.status = req.body.status
        //Create a new instance of the Task
        let createdTask: Task

        try {
            createdTask = await AppDataSource.getRepository(Task).save(newTask)

            createdTask = instanceToPlain(createdTask) as Task
            return res.json(createdTask)
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Internal Server Error" })
        }
    }

    public async update(
        req: Request,
        res: Response,
    ): Promise<Response> {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ errors: errors.array() });
        }

        // Try to find if the tasks exists
        let task: Task | null;

        try {
            task = await AppDataSource.getRepository(
                Task,
            ).findOne({
                where: { id: req.body.id },
            });
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }

        // Return 400 if task is null
        if (!task) {
            return res.status(404).json({
                error: 'The task with given ID does not exist',
            });
        }

        // Declare a variable for updatedTask
        let updatedTask: UpdateResult;

        // Update the task
        try {
            updatedTask = await AppDataSource.getRepository(
                Task,
            ).update(
                req.body.id,
                plainToInstance(Task, {
                    status: req.body.status,
                }),
            );

            // Convert the updatedTask instance to an object
            updatedTask = instanceToPlain(
                updatedTask,
            ) as UpdateResult;

            return res.json(updatedTask).status(200);
        } catch (errors) {
            return res
                .json({ error: 'Internal Server Error' })
                .status(500);
        }
    }
}


export const taskController = new TaskController()

