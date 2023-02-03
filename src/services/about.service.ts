import About, { AboutDocument } from '../models/About'
import { NotFoundError } from '../helpers/apiError'

const create = async (about: AboutDocument): Promise<AboutDocument> => {
  return about.save()
}

const findById = async (aboutId: string): Promise<AboutDocument> => {
  const foundAbout = await About.findById(aboutId)

  if (!foundAbout) {
    throw new NotFoundError(`School ${aboutId} not found`)
  }

  return foundAbout
}

const findAll = async (): Promise<AboutDocument[]> => {
  return About.find()
}

const update = async (
  aboutId: string,
  update: Partial<AboutDocument>
): Promise<AboutDocument | null> => {
  const foundAbout = await About.findByIdAndUpdate(aboutId, update, {
    new: true,
  })

  if (!foundAbout) {
    throw new NotFoundError(`School ${aboutId} not found`)
  }

  return foundAbout
}

const deleteAbout = async (
  aboutId: string
): Promise<AboutDocument | null> => {
  const foundAbout = About.findByIdAndDelete(aboutId)

  if (!foundAbout) {
    throw new NotFoundError(`About ${aboutId} not found`)
  }

  return foundAbout
}

export default {
  create,
  findById,
  findAll,
  update,
 deleteAbout,
}
