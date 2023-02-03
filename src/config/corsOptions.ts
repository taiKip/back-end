import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'www.eduservices.fi',
  'http://www.eduservices.fi/api/v1',
  'https://www.eduservices.fi',
  'https://eduservice.netlify.app/',
  'https://main--eduservice.netlify.app/',
]
const corsOptions = {
  // @ts-ignore
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  optionsSuccessStatus: 200,
}

export default corsOptions
