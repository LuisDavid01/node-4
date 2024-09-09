import { randomUUID } from 'node:crypto'
import { readJson } from '../../readJson.js'
const movies = readJson('./movies.json')
export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      movies.filter(
        movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
      )

      return movies
    } else {
      return movies
    }
  }

  static async getById ({ id }) {
    const movie = movies.find(movie => movie.id === id)
    return movie
  }

  static async create ({ input }) {
    const newMovie = {
      id: randomUUID(),
      ...input
    }
    movies.push(newMovie)
    return newMovie
  }

  static async delete ({ id }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false

    movies.splice(movieIndex, 1)
    return true
  }

  static async update ({ id, input }) {
    const movieIndex = movies.findIndex(movie => movie.id === id)

    if (movieIndex === -1) return false
    const updateMovie = {
      ...movies[movieIndex],
      ...input
    }

    movies[movieIndex] = updateMovie
    return movies[movieIndex]
  }
}
