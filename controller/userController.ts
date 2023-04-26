import { AppDataSource } from "..";
import { User } from "../src/tasks/user.entity";


export class UserConntroller {
    constructor(private taskRepository = AppDataSource.getRepository(User)) { }


    public async register(user: User) {
        const res = await this.taskRepository.insert(user)
        return res
    }

    public async login(email: string, password: string) {
        const res = await this.taskRepository.findOne({ where: { email: email, password: password } })
        return res
    }

    public async delete(id: string) {
        const res = await this.taskRepository.delete({ id: id })
        return res
    }
}