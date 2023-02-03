import mongoose, { Document, Schema } from 'mongoose'

export type AboutDocument = Document & {
    title: string,
   content:string
}

const aboutSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required:true
    }

})

export default mongoose.model<AboutDocument>('About', aboutSchema)
