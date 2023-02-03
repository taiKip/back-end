import express from 'express'

import {
  createService,
  findById,
  deleteService,
  findAll,
  updateService,
} from '../controllers/service.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Services prefix
router.get('/', findAll)
router.get('/:serviceId', findById)
router.put('/:serviceId', updateService)
router.delete('/:serviceId', deleteService)
router.post('/', createService)

export default router
