import mongoose, { Document, Schema } from 'mongoose'

export type ServiceDocument = Document & {
  title: string
  content: string
}

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

})

export default mongoose.model<ServiceDocument>('Service', serviceSchema)
