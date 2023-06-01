import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import usersRoute from './app/modules/users/users.route'
const app: Application = express()

// cors setup
app.use(cors())

// body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// Application Routes
app.use('/api/v1/users', usersRoute)

// Testing
app.get('/', async (req: Request, res: Response) => {
  res.send('Working succesfully')
})

export default app
