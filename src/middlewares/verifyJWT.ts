import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import dotenv from 'dotenv'
import { ForbiddenError } from '../helpers/apiError'
dotenv.config({ path: '../.env' })
export interface IJwtPayload extends jwt.JwtPayload{
  email: string,
  roles:string[]
}
export interface IRequestWithRole extends Request{
  roles?:string[]
}
export const verifyJWT = (req: IRequestWithRole, res: Response, next: NextFunction) => {
 
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader) return res.sendStatus(401)
  try {
    const token = (authHeader as string).split(' ')[1]
    const decoded = <IJwtPayload>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string)
console.log(decoded.UserInfo)
    req.user = decoded.UserInfo.email;
    req.roles = decoded.UserInfo.roles;

    next();
  } catch (error) {
    throw new ForbiddenError
  }
}
