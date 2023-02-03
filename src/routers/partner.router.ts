import express from 'express'

import {
  createPartner,
  findById,
  deletePartner,
  findAll,
  updatePartner,
} from '../controllers/partner.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Partners prefix
router.get('/', findAll)
router.get('/:bookId', findById)
router.put('/:bookId', updatePartner)
router.delete('/:bookId', deletePartner)
router.post('/', createPartner)

export default router
