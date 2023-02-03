import mongoose, { Document, Schema } from 'mongoose'

export type ContactDocument = Document & {
  userName: string
  email: string
  message:string
}

const contactSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model<ContactDocument>('Contact', contactSchema)
