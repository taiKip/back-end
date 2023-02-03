import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const MONGODB_URI = process.env['MONGODB_URI'] as string

//Roles
export const ADMIN: string = process.env.ADMIN_CODE || ''
export const USER: string = process.env.USER_CODE || ''
export const SUPER_ADMIN: string = process.env.SUPER_ADMIN_CODE || ''

// if (!JWT_SECRET) {
//   logger.error('No client secret. Set JWT_SECRET environment variable.')
//   process.exit(1)
// }

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  process.exit(1)
}
