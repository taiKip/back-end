import { verifyJWT } from './middlewares/verifyJWT';
import express from 'express'
const cookieParser = require('cookie-parser')
const bodyParser = require("body-parser")
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import cors from 'cors';
import options from './config/corsOptions'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

import schoolRouter from './routers/school.router'
import courseRouter from './routers/course.router'
import aboutRouter from './routers/about.router'
import partnerRouter from './routers/partner.router'
import serviceRouter from './routers/service.router'
import contactRouter from './routers/contact.router'
dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
//Cors middleware
app.use(cors(options))
app.use(bodyParser.urlencoded({extended:false}))
//cookie middleware
app.use(cookieParser())
// Set up routers
app.use('/api/v1/courses', courseRouter)
app.use('/api/v1/schools', schoolRouter)
app.use('/api/v1/about', aboutRouter)
app.use('/api/v1/partners', partnerRouter)
app.use('/api/v1/services', serviceRouter)
app.use('/api/v1/contacts',contactRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
