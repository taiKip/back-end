import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'


const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId).populate('authors')

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  return foundUser
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find();
}

const updateUser= async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`Book ${userId} not found`)
  }

  return foundUser
}

export default {
  findById,
  findAll,
  updateUser,
deleteUser,
}
