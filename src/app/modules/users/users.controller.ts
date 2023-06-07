import { NextFunction, Request, Response } from 'express'
import usersService from './user.service'

// create user in db
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = req.body
    const result = await usersService.createUser(user)
    // console.log(user)
    res.status(200).json({
      success: true,
      message: 'user create successfully.',
      data: result,
    })
  } catch (error) {
    // console.log(error)
    next(error)
  }
}

export default { createUser }
