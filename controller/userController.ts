import { AppDataSource } from "..";
import { User } from "../src/tasks/user.entity";


export class UserConntroller {
    constructor(private taskRepository = AppDataSource.getRepository(User)) { }


    public async register(user: User) {
        const res = await this.taskRepository.insert(user)
        console.log(res)
        return res
    }
}