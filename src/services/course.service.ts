import Course, { CourseDocument } from '../models/Course'
import { NotFoundError } from '../helpers/apiError'

const create = async (Course: CourseDocument): Promise<CourseDocument> => {
  return Course.save()
}

const findById = async (courseId: string): Promise<CourseDocument> => {
  const foundCourse = await Course.findById(courseId).populate({ path: "provider", model:"School"})

  if (!foundCourse) {
    throw new NotFoundError(`Course ${courseId} not found`)
  }

  return foundCourse
}

const findAll = async (): Promise<CourseDocument[]> => {
  return Course.find().populate({ path: 'provider', model: 'School' })
}

const update = async (
  courseId: string,
  update: Partial<CourseDocument>
): Promise<CourseDocument | null> => {
  const foundCourse = await Course.findByIdAndUpdate(courseId, update, {
    new: true,
  })

  if (!foundCourse) {
    throw new NotFoundError(`Course ${courseId} not found`)
  }

  return foundCourse
}

const deleteCourse = async (
  courseId: string
): Promise<CourseDocument | null> => {
  const foundCourse = Course.findByIdAndDelete(courseId)

  if (!foundCourse) {
    throw new NotFoundError(`Course ${courseId} not found`)
  }

  return foundCourse
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteCourse,
}
