import * as express from 'express';
import { AppManager } from './manager';

export default class AppController {
    static async checkPermissionsMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        const permissionUserData = await AppManager.getUser(req.body.currentUser);
        if (permissionUserData.length) {
            const [permissionUserObj] = permissionUserData
            req.body["currentUser"] = permissionUserObj.toObject()
            next();
        } else {
            console.log(req.body);
            res.status(401).send("User unauthorized in the system");
        }
    }

}
