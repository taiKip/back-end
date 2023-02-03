
import express from 'express'

import {
  createSchool,
  findById,
  deleteSchool,
  findAll,
  updateSchool,
} from '../controllers/school.controller'

const router = express.Router()


// Every path we define here will get /api/v1/Schools prefix
router.get('/', findAll)
router.get('/:schoolId', findById)
router.put('/:schoolId', updateSchool)
router.delete('/:schoolId', deleteSchool)
router.post('/',createSchool)



export default router
