import * as express from 'express';
import { IUser } from './interface';
import { AppManager } from './manager';

export default class AppController {
    static async permissionCheckMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (req.body.currentUser && req.body.currentUser.adfsId) {
            const permissionUserData = await AppManager.getUserDetails(req.body.currentUser.adfsId);
            if (permissionUserData.length) {
                const [permissionUserObj] = permissionUserData;
                req.body["currentUser"] = permissionUserObj.toObject();
                next();
            } res.status(401).send("User unauthorized in the system");
        } res.status(401).send("User unauthorized in the system");
    }

    static async apiPermissionCheckMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
        req.body.currentUser.permission == 2 ? next() : res.status(401).send("Api access denied: No permissions for this action");
    }

    static async getUserDetails(adfsId: String, res) {
        const [userDetails] = await AppManager.getUserDetails(adfsId);
        return userDetails ? res.status(201).json(userDetails) : res.status(400).json({ status: "failure" });
    }

    static async addNewUser(user: Omit<IUser, "name">, res) {
        return await AppManager.addNewUser(user) ? res.status(201).json({ status: "successfull", Newuser: user }) :
            res.status(400).json({ status: "failure" });
    }

    static async updateUser(user: Omit<IUser, "name">, res) {
        const updatedUser = await AppManager.updateUser(user);
        return updatedUser ? res.status(200).json(updatedUser) :
            res.status(400).json({ status: "failure" });
    }

    static async deleteUser(adfsId: String, res) {
        const result = await AppManager.deleteUser(adfsId);
        return result ? res.status(200).json(result) :
            res.status(400).json({ status: "failure" });
    }

}
