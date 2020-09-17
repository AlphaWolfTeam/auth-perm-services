import * as express from 'express';
import ValidateRequest from '../utils/joi';
import config from '../config'
const proxy = require("express-http-proxy");

import { getUserPermissionSchema } from './validator.schema';
import AppController from './controller'

const appRouter = express.Router();

appRouter.use('*', AppController.permissionCheckMiddleware);
appRouter.use('/api', AppController.apiPermissionCheckMiddleware)

appRouter.get('/',ValidateRequest(getUserPermissionSchema), proxy(config.service.clientURL));

appRouter.get('/api/currentuser', async (req: express.Request, res: express.Response) => {
    AppController.getUserDetails(req.body.currentUser.adfsId, res)
});

appRouter.get('/api/getuserbyid', async (req: express.Request, res: express.Response) => {
    AppController.getUserDetails(req.body.adfsId, res)
});

appRouter.post('/api/adduser', async (req: express.Request, res: express.Response) => {
    AppController.addNewUser(req.body.newUser, res);
});

appRouter.put('/api/edituser', (req: express.Request, res: express.Response) => {
    AppController.updateUser(req.body.userDetails, res);
});

appRouter.delete('/api/deleteuser', (req: express.Request, res: express.Response) => {
    AppController.deleteUser(req.body.adfsId, res);
});

appRouter.use('/isAlive', (_req: express.Request, res: express.Response) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
