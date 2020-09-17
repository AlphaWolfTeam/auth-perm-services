import * as express from 'express';
import ValidateRequest from '../utils/joi';
import config from '../config'
const proxy = require("express-http-proxy");

import { getUserPermissionSchema } from './validator.schema';
import AppController from './user/controller'
import userRouter from './user/router'

const appRouter = express.Router();

appRouter.use('*', AppController.permissionCheckMiddleware);
appRouter.use('/api', AppController.apiPermissionCheckMiddleware);

appRouter.get('/',ValidateRequest(getUserPermissionSchema), proxy(config.service.clientURL));

appRouter.use('/api/user', userRouter);

appRouter.use('/isAlive', (_req: express.Request, res: express.Response) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
