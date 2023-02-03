import { Request, Response, NextFunction } from 'express'

import User from '../models/User'
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

export const handleLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email)
    return res
      .status(400)
      .json({ message: 'email is required.' })
  if (!password) return res.status(400).json({ message: 'Password required.' })
  const foundUser = await User.findOne({ email: email }).exec()
  if (!foundUser) return res.sendStatus(401) //

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password)
  if (match) {
    const roles = Object.values(foundUser.roles);
  
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '600s' }
    )
    const refreshToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    )
    //Saving refreshToken with current user
    foundUser.refreshToken = refreshToken
    const result = await foundUser.save()


    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    })
    res.json({ accessToken })
  } else {
    res.sendStatus(401)
  }
}
