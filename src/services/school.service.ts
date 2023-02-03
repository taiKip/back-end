import School, { SchoolDocument } from '../models/School'
import { NotFoundError } from '../helpers/apiError'

const create = async (school: SchoolDocument): Promise<SchoolDocument> => {
  return school.save()
}

const findById = async (schoolId: string): Promise<SchoolDocument> => {
  const foundSchool = await School.findById(schoolId)

  if (!foundSchool) {
    throw new NotFoundError(`School ${schoolId} not found`)
  }

  return foundSchool
}

const findAll = async (): Promise<SchoolDocument[]> => {
  return School.find().populate('Courses')
}

const update = async (
  schoolId: string,
  update: Partial<SchoolDocument>
): Promise<SchoolDocument | null> => {
  const foundSchool = await School.findByIdAndUpdate(schoolId, update, {
    new: true,
  })

  if (!foundSchool) {
    throw new NotFoundError(`School ${schoolId} not found`)
  }

  return foundSchool
}

const deleteSchool = async (schoolId: string): Promise<SchoolDocument | null> => {
  const foundSchool = School.findByIdAndDelete(schoolId)

  if (!foundSchool) {
    throw new NotFoundError(`School ${schoolId} not found`)
  }

  return foundSchool
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteSchool,
}
