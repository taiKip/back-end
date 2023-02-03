import express from 'express'

import {
  createAbout,
  findById,
  deleteAbout,
  findAll,
  updateAbout,
} from '../controllers/about.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Abouts prefix
router.get('/', findAll)
router.get('/:aboutId', findById)
router.put('/:aboutId', updateAbout)
router.delete('/:aboutId', deleteAbout)
router.post('/', createAbout)

export default router
