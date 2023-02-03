import mongoose, { Document, Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

type role = {
  type: number
  default: number
}
type rolesType = {
  role: role
}

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  image?: string
  password: string
  refreshToken: string
  books?: string[]
  roles: rolesType
  cart: string
}

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        'https://t-openlibrary.s3.eu-north-1.amazonaws.com/noprofile.jpg',
    },
    roles: {
      User: {
        type: Number,
        default: process.env.USER_CODE,
      },
      Admin: Number,
      SuperAdmin: Number,
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: String,
  },
  { timestamps: true }
)

export default mongoose.model<UserDocument>('User', userSchema)
