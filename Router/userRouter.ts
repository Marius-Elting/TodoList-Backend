import { UserConntroller } from '../controller/userController';
import { encryptPassword } from '../middleware/encrypt';


import { Router, Request, Response } from "express";
import { createToken } from '../util/token';


export const userRouter: Router = Router()

userRouter.post("/register", encryptPassword, async (req: Request, res: Response) => {
    const user = req.body

    try {
        const userController = new UserConntroller()
        const response = await userController.register(user)
        user.id = response.identifiers[0].id
        const token: string = createToken(user)

        res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
        res.send("registered")
    } catch (err) {
        console.log(err)
        res.send("Email already in use")
    }
})



userRouter.post("/login", encryptPassword, async (req: Request, res: Response) => {
    const user = req.body
    try {
        const userController = new UserConntroller()
        const response = await userController.login(user.email, user.password)


        if (response === null) {
            res.status(401).send("Email or Password Wrong")
        } else {
            const token = createToken(response)
            res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
            console.log(token)
            res.send("Logged in")
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }

})