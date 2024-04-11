import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { handleError } from "../errors/AppError";

export const authEmplooye = (req: Request, res: Response, next: NextFunction) => {

        const token: any = req.headers.authorization;
        if(!token){handleError(401,"Necessário Token", res);}
        const tokenSplit = token.split(" ")[1];

        jwt.verify(tokenSplit as string, String(process.env.JWT_SECRET), (err: any, decoded: any) => {
                if (err) {
                    console.error(err);
                    handleError(401, "Token Inválido", res);
                } else {
                    next();
                }
        });
 
}