import { Request, Response, NextFunction } from 'express'

import Contact from '../models/Contact'
import ContactService from '../services/contact.service'
import { BadRequestError } from '../helpers/apiError'

// POST /Contacts
export const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
        userName,
        email,
        message
    } = req.body

    const contact = new Contact({
      userName,
      email,
      message,
    })

    await ContactService.create(contact)
    res.json(contact)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /Contacts/:contactId
export const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const contactId = req.params.contactId
    const updatedContact = await ContactService.update(contactId, update)
    res.json(updatedContact)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /Contacts/:contactId
export const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await ContactService.deleteContact(req.params.contactId)
    res.status(204).end()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Contacts/:contactId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ContactService.findById(req.params.contactId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /Contacts
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    res.json(await ContactService.findAll())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
