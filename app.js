import express, { json } from 'express'
import cors from 'cors'
import { movieRouter } from './routes/movies.js'
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000
app.use(json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      'http://localhost:8080',
      'http://localhost:3000',
      'https://movies.com',
      'https://midu.dev'
    ]
    if (ACCEPTED_ORIGINS.includes(origin)) {
      return callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error('Not allowed by CORS'))
  }
}))
app.use('/movies', movieRouter)
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})
