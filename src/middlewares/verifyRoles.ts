import { NextFunction,Response } from "express"
import { IRequestWithRole } from "./verifyJWT"


export const verifyRoles = (allowedRoles: number[]) => {
    return (req:IRequestWithRole, res: Response, next: NextFunction) => {
        if(!req?.roles) return res.sendStatus(401)
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log("roles of user",req.roles)
        const result = req.roles.map(role => rolesArray.includes(+role)).find(val => val === true);
       // console.log("result",result)
        if (!result) return res.sendStatus(401);
        next();
    }
}