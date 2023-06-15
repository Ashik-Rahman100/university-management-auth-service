import { RequestHandler } from 'express';
import { UserService } from './user.service';

// create user in db
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body;
    const result = await UserService.createUser(user);
    // console.log(user)
    res.status(200).json({
      success: true,
      message: 'user create successfully.',
      data: result,
    });
  } catch (error) {
    // console.log(error)
    next(error);
  }
};

export const UserController = { createUser };
