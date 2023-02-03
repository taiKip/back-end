import { Request, Response, NextFunction } from 'express'

import Service from '../models/Service'
import ServiceService from '../services/service.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Services
export const createService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body

    const service = new Service({
      title,
    
    })

    await ServiceService.create(service)
    res.json(Service)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Services/:serviceId
export const updateService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const serviceId = req.params.serviceId
    const updatedService = await ServiceService.update(serviceId, update)
    res.json(updatedService)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Services/:serviceId
export const deleteService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ServiceService.deleteService(req.params.serviceId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Services/:serviceId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ServiceService.findById(req.params.serviceId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Services
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ServiceService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
