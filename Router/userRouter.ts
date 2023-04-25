import { UserConntroller } from '../controller/userController';
import { encryptPassword } from '../middleware/encrypt';

import { validationResult, body } from "express-validator"

import { Router, Request, Response } from "express";
import { createToken } from '../util/token';


export const userRouter: Router = Router()

userRouter.post(
    "/register",
    body("password").isString().isLength({ min: 5 }).withMessage("The password has to be at least 5 letters long"),
    body("email").isEmail().withMessage("Please enter a valid Email"),
    encryptPassword,
    async (req: Request, res: Response) => {
        const user = req.body
        const result = validationResult(req)

        if (result.array().length > 0) {
            res.json(result.array())
            return
        }
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
    }
)



userRouter.post(
    "/login",
    encryptPassword,
    async (req: Request, res: Response) => {
        const user = req.body
        try {
            const userController = new UserConntroller()
            const response = await userController.login(user.email, user.password)

            if (response === null) {
                res.status(401).send("Email or Password Wrong")
            } else {
                const token = createToken(response)
                res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'none' })
                res.send("Logged in")
            }
        } catch (err) {
            console.log(err)
            res.send(err)
        }

    }
)