import express from 'express'

import {
  createContact,
  findById,
  deleteContact,
  findAll,
  updateContact,
} from '../controllers/contact.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Contacts prefix
router.get('/', findAll)
router.get('/:contactId', findById)
router.put('/:contactId', updateContact)
router.delete('/:contactId', deleteContact)
router.post('/', createContact)

export default router
