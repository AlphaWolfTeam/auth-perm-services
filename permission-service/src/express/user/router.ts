import * as express from 'express';
import AppController from './controller'

const userRouter = express.Router();

userRouter.get('/current', AppController.getCurrentUser);

userRouter.get('/', AppController.getAllUsers);

userRouter.get('/:id', AppController.getUserById);

userRouter.post('/', AppController.createUser);

userRouter.put('/', AppController.updateUser);

userRouter.delete('/:id', AppController.deleteUser);

export default userRouter;