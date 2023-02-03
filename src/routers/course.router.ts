import express from 'express'

import {
  createCourse,
  findById,
  deleteCourse,
  findAll,
  updateCourse,
} from '../controllers/course.controller'

const router = express.Router()

// Every path we define here will get /api/v1/Courses prefix
router.get('/', findAll)
router.get('/:courseId', findById)
router.put('/:courseId', updateCourse)
router.delete('/:courseId', deleteCourse)
router.post('/', createCourse)

export default router
