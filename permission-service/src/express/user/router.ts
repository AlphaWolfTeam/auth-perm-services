import * as express from 'express';
import AppController from './controller'

const userRouter = express.Router();

userRouter.get('/', async (req: express.Request, res: express.Response) => {
    AppController.getUserDetails(req.body.currentUser.adfsId, res);
});

userRouter.get('/:id', async (req: express.Request, res: express.Response) => {
    AppController.getUserDetails(req.params.id, res);
});

userRouter.post('/', async (req: express.Request, res: express.Response) => {
    AppController.addNewUser(req.body.newUser, res);
});

userRouter.put('/', (req: express.Request, res: express.Response) => {
    AppController.updateUser(req.body.userDetails, res);
});

userRouter.delete('/', (req: express.Request, res: express.Response) => {
    AppController.deleteUser(req.body.adfsId, res);
});

export default userRouter;