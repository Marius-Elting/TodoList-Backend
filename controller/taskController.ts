import { Task } from "../src/Entitys/tasks.entity";
import { AppDataSource } from "..";
import { instanceToPlain } from "class-transformer";

export class TaskController {
    constructor(private taskRepository = AppDataSource.getRepository(Task)) { }

    public async gettAll(): Promise<Task[]> {
        let allTasks: Task[]
        try {
            allTasks = await this.taskRepository.find({
                order: {
                    date: "ASC"
                }
            })
            allTasks = instanceToPlain(allTasks) as Task[]
            return allTasks
        } catch (err) {
            console.log(err)
            throw (err)
        }

    }
}