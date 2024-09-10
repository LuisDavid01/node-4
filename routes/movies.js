import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'
export const createMovieRouter = ({ movieModel }) => {
  const movieRouter = Router()
  const moviesController = new MoviesController({ movieModel })
  // respuesta raiz
  movieRouter.get('/', moviesController.getAll)
  // respuesta get por id
  movieRouter.get('/:id', moviesController.getById)
  // respuesta crear pelicula
  movieRouter.post('/', moviesController.create)
  // respuesta modificar pelicula
  movieRouter.patch('/:id', moviesController.update)
  // respuesta eliminar
  movieRouter.delete('/:id', moviesController.delete)
  return movieRouter
}
