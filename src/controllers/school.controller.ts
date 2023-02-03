import { Request, Response, NextFunction } from 'express'

import School from '../models/School'
import SchoolService from '../services/school.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Schools
export const createSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, location, courses, type } = req.body

    const school = new School({
      name,
      location,
      courses,
      type,
    })

    await SchoolService.create(school)
    res.json(School)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Schools/:schoolId
export const updateSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const schoolId = req.params.schoolId
    const updatedSchool = await SchoolService.update(schoolId, update)
    res.json(updatedSchool)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Schools/:schoolId
export const deleteSchool = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await SchoolService.deleteSchool(req.params.schoolId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Schools/:schoolId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await SchoolService.findById(req.params.schoolId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Schools
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await SchoolService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
