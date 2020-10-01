import { Request, Response, NextFunction } from 'express';
import AppManager from './manager';

export default class PermissionMiddleware {
        
    static async generalAccess(req: Request, res: Response, next: NextFunction) {
        if (req.body.currentUser && req.body.currentUser.adfsId) {
            const permissionUserData = await AppManager.getUserDetails(req.body.currentUser.adfsId);
            if (permissionUserData.length) {
                const [permissionUserObj] = permissionUserData;
                req.body["currentUser"] = permissionUserObj.toObject();
                next();
                return true;
            }
            res.status(401).send("User unauthorized in the system")
            return false;
       }
       res.status(401).send("User unauthorized in the system")
       return false;
    }
}
