import { Request, Response, NextFunction } from 'express'

import About from '../models/About'
import AboutService from '../services/about.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Abouts
export const createAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
        title,
       content
    } = req.body

    const about = new About({
      title,
       content
    })

    await AboutService.create(about)
    res.json(about)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Abouts/:aboutId
export const updateAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const aboutId = req.params.aboutId
    const updatedAbout = await AboutService.update(aboutId, update)
    res.json(updatedAbout)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Abouts/:aboutId
export const deleteAbout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await AboutService.deleteAbout(req.params.aboutId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Abouts/:aboutId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AboutService.findById(req.params.aboutId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Abouts
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await AboutService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
