import {Router} from 'express'
import userController from '../controller/userController.js';

const userRouter = Router()

userRouter.post('/register',userController.register)
userRouter.post('/authenticate',userController.authenticate)

export default userRouter;