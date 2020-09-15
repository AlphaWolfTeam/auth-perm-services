import { Router } from 'express';
import { wrapController } from '../utils';
import ValidateRequest from '../utils/joi';
import config from '../config'
const proxy = require("express-http-proxy");

import { getAppPermissionSchema } from './validator.schema';
import AppController from './controller'

const appRouter = Router();

appRouter.use('*', wrapController(AppController.checkPermissionsMiddleware));

appRouter.get('/', ValidateRequest(getAppPermissionSchema), proxy(config.service.clientURL));

// TODO: 1.Add  2.Edit  3.Delete

appRouter.use('/isAlive', (_req, res) => {
    res.status(200).send('alive');
});

appRouter.use('*', (_req, res) => {
    res.status(404).send('Invalid Route');
});

export default appRouter;
