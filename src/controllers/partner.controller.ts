import { Request, Response, NextFunction } from 'express'

import Partner from '../models/Partner'
import PartnerService from '../services/partner.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Partners
export const createPartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      firstName,
      lastName,
      title,
      image,
      descriptionLong,
      descriptionShort,
      linkedIn
    } = req.body

    const partner = new Partner({
      firstName,
      lastName,
      title,
      image,
      descriptionLong,
      descriptionShort,
      linkedIn
    })

    await PartnerService.create(partner)
    res.json(partner)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Partners/:partnerId
export const updatePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const partnerId = req.params.partnerId
    const updatedPartner = await PartnerService.update(partnerId, update)
    res.json(updatedPartner)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Partners/:partnerId
export const deletePartner = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await PartnerService.deletePartner(req.params.partnerId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Partners/:partnerId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await PartnerService.findById(req.params.partnerId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Partners
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await PartnerService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
