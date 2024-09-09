import { Router } from 'express'
import { MoviesController } from '../controllers/movies.js'
export const movieRouter = Router()

// respuesta raiz
movieRouter.get('/', MoviesController.getAll)
// respuesta get por id
movieRouter.get('/:id', MoviesController.getById)
// respuesta crear pelicula
movieRouter.post('/', MoviesController.create)
// respuesta modificar pelicula
movieRouter.patch('/:id', MoviesController.update)
// respuesta eliminar
movieRouter.delete('/:id', MoviesController.delete)
