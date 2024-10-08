import express, { json } from 'express'
import { costMiddleware } from './middlewares/cors.js'
import { createMovieRouter } from './routes/movies.js'
import { MovieModel } from './models/database/movie.js'
const app = express()
app.disable('x-powered-by')
export const createApp = ({ movieModel }) => {
  const PORT = process.env.PORT ?? 3000
  app.use(json())
  app.use(costMiddleware())
  app.use('/movies', createMovieRouter({ movieModel: MovieModel }))
  app.listen(PORT, () => {
    console.log(`El servidor esta escuchando en el puerto ${PORT}`)
  })
}
