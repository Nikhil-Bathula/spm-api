import {NextFunction, Request, Response} from "express";
const jwt = require('jsonwebtoken');

type UserAuthObject = {
    id: number,
    email: string
    company_id: number
}

export class AuthMiddleware{

    authenticateUser(req: Request, res: Response, next: NextFunction){
        const headers = req.headers['authorization']
        const bearer_token = headers && headers.split(" ")
        if(bearer_token == null) res.sendStatus(401)
        jwt.verify(bearer_token, process.env.ACCESS_TOKEN_SECRET, (err: Error, user: UserAuthObject) => {
            if(err) return res.sendStatus(403)
            // @ts-ignore
            req.user_auth_obj = user
            next()
        })
    }

}