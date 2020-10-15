import * as http from 'http';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as helmet from 'helmet';
import * as proxy from "express-http-proxy";
import { once } from 'events';
import ValidateRequest from '../utils/joi';
import config from '../config'
import { getUserPermissionSchema } from './validator.schema';
import { errorMiddleware } from '../utils/error';
import userRouter from './router'
import PermissionMiddleware from './middleware';

class Server {
    private app: express.Application;
    private http: http.Server;
    private port: number;

    constructor(port: number) {
        this.app = Server.createExpressApp();
        this.port = port;
    }

    static createExpressApp() {
        const app = express();

        app.use(helmet());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        app.use('*', PermissionMiddleware.generalAccess);

        app.use('/api/user', userRouter);
        app.all('/api/schema', ValidateRequest(getUserPermissionSchema), proxy(config.service.schemaApiUrl));
        app.all('/api/instance', ValidateRequest(getUserPermissionSchema), proxy(config.service.instanceApiUrl));

        app.use(errorMiddleware);

        return app;
    }

    async start() {
        this.http = this.app.listen(this.port);
        await once(this.http, 'listening');
    }
}

export default Server;
