import { UserConntroller } from '../controller/userController';
import { encryptPassword } from '../middleware/encrypt';


import { Router, Request, Response } from "express";


export const userRouter: Router = Router()

userRouter.post("/register", encryptPassword, async (req: Request, res: Response) => {
    const user = req.body
    try {
        const userController = new UserConntroller()
        await userController.register(user)
        res.send("registered")
    } catch (err) {
        console.log(err)
        res.send("Email already in use")
    }
})
