import { createToken, verifyToken } from './../util/token';
import { UserConntroller } from '../controller/userController';
import { encryptPassword } from '../middleware/encrypt';
import { validationResult, body } from "express-validator"
import { Router, Request, Response } from "express";


export const userRouter: Router = Router()
const checkRegister = [
    body("password").isString().isLength({ min: 5 }).withMessage("The password has to be at least 5 letters long"),
    body("email").isEmail().withMessage("Please enter a valid Email"),
]
userRouter.post(
    "/register",
    checkRegister,
    encryptPassword,
    async (req: Request, res: Response) => {
        const user = req.body
        const result = validationResult(req)

        if (result.array().length > 0) {
            res.status(401).json(result.array())
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
    checkRegister,
    encryptPassword,
    async (req: Request, res: Response) => {
        const user = req.body
        const result = validationResult(req)

        if (result.array().length > 0) {
            res.status(401).json(result.array())
            return
        }
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


userRouter.delete("/delete", async (req: Request, res: Response) => {
    const token = req.cookies.token
    const encryptToken = verifyToken(token)
    try {
        const userController = new UserConntroller()
        const response = await userController.delete(encryptToken.id)
        if (response.affected && response.affected >= 1) {
            res.json({ message: "User Deleted Successfully" })
        } else {
            res.json({ message: "User does not exists" })
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})