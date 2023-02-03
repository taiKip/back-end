import mongoose, { Document, Schema } from 'mongoose'

export type SchoolDocument = Document & {
  name: string
  type: 'UAS' | 'UNI'
  location: string
  courses: string[]
}

const schoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },

  courses: [{ type: Schema.Types.ObjectId, ref: 'Courses' }],
})

export default mongoose.model<SchoolDocument>('School', schoolSchema)
