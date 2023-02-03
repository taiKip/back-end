import mongoose, { Document, Schema } from 'mongoose'

export type CourseDocument = Document & {
  title: string
  level: string
  code:string
  credits: number
  description: string[]
  provider: string
  cost: number
  thumbnail:string
  duration: number //In months
  scholarship:string //percentage
  applicationBegins: Date
  applicationEnds:Date
}

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    credits: {
      type: Number,
      required: true,
    },
    description: [{
      type: String,
      required: true,
    }],

    cost: {
      type: Number,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    duration: {
      type: Number,
      required: true,
    },
    scholarship: {
      type:Number,
    },
    applcationBegins: {
      type: Date,
     
    },
  
    applicationEnds: {
      type: Date,
     
    },
    provider: { type: Schema.Types.ObjectId,required:true,ref: 'School' },
  },
  { timestamps: true }
)

export default mongoose.model<CourseDocument>('Course', courseSchema)
