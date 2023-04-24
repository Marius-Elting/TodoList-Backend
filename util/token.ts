import jwt from "jsonwebtoken"
import { User } from "../src/tasks/user.entity"

export const createToken = (user: User) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT Secret could not be accesed")
    }
    const secret: string = process.env.JWT_SECRET
    const token = jwt.sign({ name: user.username, id: user.id, email: user.email }, secret, { expiresIn: "10min" })
    return token
}


export const verifyToken = (token: string) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT Secret could not be accesed")
    }
    const result = jwt.verify(token, process.env.JWT_SECRET)
    return result
}