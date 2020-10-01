import * as express from 'express';
import AppController from './controller'

const userRouter = express.Router();

userRouter.get('/current', AppController.getCurrentUser);

userRouter.get('/', AppController.getAllUsers);

userRouter.get('/:id', AppController.getUserById);

userRouter.post('/', AppController.createUser);

userRouter.put('/', AppController.updateUser);

userRouter.delete('/:id', AppController.deleteUser);

userRouter.use('/isAlive', (_req: express.Request, res: express.Response) => {
    res.status(200).send('alive');
});

export default userRouter;