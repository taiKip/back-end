import { Request, Response, NextFunction } from 'express'
import { BadRequestError } from '../helpers/apiError'
const bcrypt = require('bcrypt')
import User from '../models/User'

export const handleNewUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, password, email } = req.body

 
  if (!email || !firstName || !lastName || !password)
    return res
      .status(400)
      .json({ message: 'firstName,email, lastName and password are required.' })
  // check for duplicates
  const duplicateEmail = await User.findOne({ email: email }).exec()

  if (duplicateEmail)
    return res.status(409).json({ message: 'email already exists.' })

  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10)
    //create and store the new user
    const user = new User({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPwd,
    })
    await User.create(user)
    res.status(201).json({ success: `New user ${firstName} created!` })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
