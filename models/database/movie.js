import mysql from 'mysql2/promise'

const config = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'root',
  database: 'moviesdb'
}
const connection = await mysql.createConnection(config)
export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      const genreLower = genre.toLowerCase()
      const [moviesFiltered] = await connection.query(
        'SELECT m.*, BIN_TO_UUID(m.id) id FROM movies AS m INNER JOIN movie_genre AS mg ON m.id = mg.movie_id INNER JOIN genre AS g ON mg.genre_id = g.id WHERE LOWER(g.name) = ?;', genreLower)
      console.log(moviesFiltered)
      return moviesFiltered
    }

    const [movies] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) id FROM movies;')
    console.log(movies)
    return movies
  }

  static async getById ({ id }) {
    const [movie] = await connection.query(
      'SELECT *, BIN_TO_UUID(id) id FROM movies WHERE id = UUID_TO_BIN(?);', id)
    console.log(movie)
    return movie
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // tarea
      title,
      year,
      duration,
      director,
      rate,
      poster
    } = input
    const [uuidResult] = await connection.query('SELECT UUID() uuid;')

    const [{ uuid }] = uuidResult

    // se hace el insert
    try {
      await connection.query(`INSERT INTO movies ( id, title, year, director, duration, poster, rate)
        VALUES (UUID_TO_BIN(?),?,?,?,?,?,?)`,
      [uuid, title, year, director, duration, poster, rate])
    } catch (error) {
      throw new Error('error creating movie')
    }
    const [movies] = await connection.query(
      `SELECT title, year, director, duration, poster, rate, BIN_TO_UUID(id) id
      FROM movies WHERE id = UUID_TO_BIN(?);`, [uuid]
    )
    return movies[0]
  }

  static async delete ({ id }) {
  // tarea
  }

  static async update ({ id, input }) {
    // tarea
  }
}
