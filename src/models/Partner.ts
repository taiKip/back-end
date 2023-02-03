import mongoose, { Document, Schema } from 'mongoose'

export type PartnerDocument = Document & {
  firstName: string
  lastName:string
  title: string
    image:string
   descriptionLong: string
  descriptionShort: string
   linkedIn:string
}

const partnerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  descriptionLong: {
    type: String,
    required: true,
  },
  descriptionShort: {
    type: String,
    required: true,
  },
  linkedIn: {
    type: String,
    required: true,
  }
})

export default mongoose.model<PartnerDocument>('Partner', partnerSchema)
