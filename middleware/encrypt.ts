import { createHmac } from "crypto";
import { Request, Response, NextFunction } from "express";

export const encryptPassword = (req: Request, res: Response, next: NextFunction) => {
    const hmac = createHmac('sha512', req.body.password)
    req.body.password = hmac.digest('hex')
    next()
}