import { Request, Response } from 'express';
import { AppManager } from './manager';
import { apiPermissionCheck } from '../utils/index'
import config from '../config/index'
const { userPermission } = config;

export default class AppController {
    
    static async getAllUsers(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.getAllUsersPermissionId)) {
            const usersList = await AppManager.getAllUsers();
            if(usersList) {
                res.status(201).json(usersList);
                return true;
            }
            res.status(400).json({ status: "failure" });
            return false;
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

    static async getCurrentUser(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.getCurrentUserPermissionId)) {
            const [userDetails] = await AppManager.getUserDetails(req.body.currentUser.adfsId);
            if (userDetails) {
                res.status(201).json(userDetails);
                return true;
            } else {
                res.status(400).json({ status: "failure" });
                return false;
            }
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

    static async getUserById(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.getUserByIdPermissionId)) {
            const [userDetails] = await AppManager.getUserDetails(req.params.id);
            if (userDetails) {
                res.status(201).json(userDetails);
                return true;
            } else {
                res.status(400).json({ status: "No such user found" });
                return false;
            }
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

    static async createUser(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.createUserPermissionId)) {
            if (await AppManager.createUser(req.body.newUser)) {
                res.status(201).json({ status: "successfull", Newuser: req.body.newUser });
                return true;
            }
            res.status(400).json({ status: "failure" });
            return false;
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

    static async updateUser(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.updateUserPermissionId)) {
            const updatedUser = await AppManager.updateUser(req.body.userDetails);
            if (updatedUser) {
                res.status(200).json(updatedUser);
                return true;
            }
            res.status(400).json({ status: "failure. No such user" });
            return false;
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

    static async deleteUser(req: Request, res: Response) {
        if (await apiPermissionCheck(req, userPermission.createUserPermissionId)) {
            const result = await AppManager.deleteUser(req.params.id);
            if (result) {
                res.status(200).json(result);
                return true;
            }
            res.status(400).json({ status: "failure. No such user" });
            return false;
        }
        res.status(401).send('API Access denied: No permissions for this operation')
        return false;
    }

}
