import { Request, Response, NextFunction } from 'express'

import Course from '../models/Course'
import CourseService from '../services/course.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Courses
export const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      level,
      code,
      credits,
      thumbnail,
      description,
      providers,
      scholarship,
      applicationBegins,
      applicationEnds,
      cost,
      duration,
      provider,
    } = req.body

    const course = new Course({
      title,
      level,
      code,
      credits,
      description,
      providers,
      cost,
      thumbnail,
      duration,
      scholarship,
      applicationBegins,
      applicationEnds,
      provider,
    })

    await CourseService.create(course)
    res.json(course)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Courses/:courseId
export const updateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const courseId = req.params.courseId
    const updatedCourse = await CourseService.update(courseId, update)
    res.json(updatedCourse)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Courses/:courseId
export const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await CourseService.deleteCourse(req.params.courseId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Courses/:courseId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CourseService.findById(req.params.courseId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Courses
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await CourseService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
