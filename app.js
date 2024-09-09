import express, { json } from 'express'
import { costMiddleware } from './middlewares/cors.js'
import { movieRouter } from './routes/movies.js'
const app = express()
app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000
app.use(json())
app.use(costMiddleware())
app.use('/movies', movieRouter)
app.listen(PORT, () => {
  console.log(`El servidor esta escuchando en el puerto ${PORT}`)
})
