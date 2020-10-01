import * as express from 'express';
import ValidateRequest from '../utils/joi';
import config from '../config'
const proxy = require("express-http-proxy");

import { getUserPermissionSchema } from './validator.schema';
import userRouter from './user/router'
import PermissionMiddleware from './user/middleware'

const appRouter = express.Router();

appRouter.use('*', PermissionMiddleware.generalAccess);

appRouter.use('/permission/api/user', userRouter);

appRouter.use('/isAlive', (_req: express.Request, res: express.Response) => {
    res.status(200).send('alive');
});

appRouter.all('*', ValidateRequest(getUserPermissionSchema), proxy(config.service.clientURL));

export default appRouter;
