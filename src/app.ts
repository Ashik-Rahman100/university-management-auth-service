import cors from 'cors'
import express, { Application, Request } from 'express'
const app: Application = express()

// cors setup
app.use(cors())
// body parser
app.use(express.urlencoded({ extended: true }))

// Testing
app.get('/', (req: Request, res: any) => {
  res.send('Working succesfully')
})

export default app
